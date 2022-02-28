from jinja2 import Template

#index page
def index(name,dic):
    with open('../Template/indexTemplate.html') as file_:
        template = Template(file_.read())
    return template.render(name=name,dic=dic)


def filme(title,year,atores,generos):
    with open('../Template/filmeTemplate.html') as file_:
        template = Template(file_.read())
    return template.render(title=title,year=year,atores=atores,generos=generos)


def entity(title,lista):
    with open('../Template/entityTemplate.html') as file_:
        template = Template(file_.read())
        return template.render(title=title,lista=lista)


#dic={'A':['cenas','cenas2','cenas3'],'B':['cenas','cenas2','cenas3'], 'C':['cenas','cenas2','cenas3']}

#print(filmes(dic))
