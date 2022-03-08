from jinja2 import Template

#index page
def index(name,listaNav,dic):
    with open('../Template/indexTemplate.html') as file_:
        template = Template(file_.read())
    return template.render(name=name,listaNav=listaNav,dic=dic)


def filme(title,listaNav,year,atores,generos):
    with open('../Template/filmeTemplate.html') as file_:
        template = Template(file_.read())
    return template.render(title=title,listaNav=listaNav,year=year,atores=atores,generos=generos)


def entity(title,listaNav,lista):
    with open('../Template/entityTemplate.html') as file_:
        template = Template(file_.read())
        return template.render(title=title,listaNav=listaNav,lista=lista)


#dic={'A':['cenas','cenas2','cenas3'],'B':['cenas','cenas2','cenas3'], 'C':['cenas','cenas2','cenas3']}

#print(filmes(dic))
