import requests
import re
import json
from bs4 import BeautifulSoup
file = open("web/notes/Book17.json", "w")

chapters = []
people_names = []
term_names = []


def get_passage_string(p):
    string = str(p.get_text()).replace("  ", "")
    return string


for chapter_num in range(1, 41, 1):
    url = 'https://apnotes.net/notes-17e/ch' + str(chapter_num) + '-17e.html'
    page = requests.get(url)
    page = BeautifulSoup(page.content, "html.parser")
    notes = page.find(id="content")
    print('Scanning chapter ' + str(chapter_num))
    notes.p.append("")
    paragraphs = notes.find_all('p') + notes.find_all('table')
    paragraphs.pop(0)
    if(not str(paragraphs[0].string)[0].isdigit()):
        print(paragraphs[0].string)
        title = str(paragraphs.pop(0).string).strip()
    else:
        title = "No title"
    times = (paragraphs.pop(0).string).split('-')
    time_start = str(times[0]).strip()
    time_end = str(times[1]).strip()
    chapter = {
        'title': title,
        'chapter_number': chapter_num,
        'start_date': time_start,
        'end_date': time_end
    }
    people = []
    terms = []
    chapter_sections = []
    paragraphs.pop(0)
    cur_section = {}
    for p in paragraphs:
        string = get_passage_string(p)
        # new line
        if(len(string) == 1):
            chapter_sections.append(cur_section)
            cur_section = {}
            continue
        # title
        if(p.find('tr') and len(p.find('tr')) > 1):
            table_data = {}
            rows = p.find_all("tr")
            header = rows.pop(0)
            for b in header.find_all("b"):
                table_data[b.get_text()] = []
            if(len(table_data) == 0):
                table_data["Time"] = []
                table_data["Event"] = []
            for row in rows:
                cols = row.find_all("p")
                for key in table_data:
                    colstrings = cols.pop(0).stripped_strings
                    table_data[key].append('\n'.join(list(colstrings)))
            chapter_sections[-1]['table'] = table_data
            continue

        if(not 'title' in cur_section.keys() and (p.b or p.strong) and len(p.contents) == 1):
            cur_section['title'] = string.replace("\n", "")
            continue

        # normal text

        if('text' in cur_section.keys()):
            cur_section['text'] = cur_section['text'] + '\n' + string
        else:
            cur_section['text'] = string
            # checking for people and terms
            underlined = p.find_all("u")
            for person in underlined:
                name = get_passage_string(person)
                if name not in people_names:
                    people_names.append(name)
                    people_names = list(
                        set(people_names))
                    people.append({
                        "name": name,
                        "chapter": chapter_num,
                        "passage": string
                    })

            bolded = p.find_all("b")
            for bold in bolded:
                term = get_passage_string(bold)
                if term not in term_names and not term[0:4].isnumeric() and re.compile("[0-9%]+").fullmatch(term) is None and len(term) > 0:
                    term_names.append(term)
                    term_names = list(set(term_names))
                    terms.append({
                        "name": term,
                        "chapter": chapter_num,
                        "passage": string
                    })
            continue

    chapter['sections'] = chapter_sections
    chapter['terms'] = terms
    chapter['people'] = people
    chapters.append(chapter)
file.write(json.dumps(chapters))
file.close()
print("-" * 20)
print("Finished!")
print('Counted ' + str(len(term_names)) + " terms")
print('Counted ' + str(len(people_names)) + " people")
