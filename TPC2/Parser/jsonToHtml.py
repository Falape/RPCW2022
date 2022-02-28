
import json
import re
import os
from sys import argv
from jinja2 import Template

import writeTemplates

def checkFstLetter(name):
    if(name[0].isalpha()):
        return(False,name[0].upper())
    else:
        return (True,None)

#name clean
def nameFormat(name):
    name = re.sub(r' ','_',name)
    name = re.sub(r'\/','-',name)
    name = re.sub(r"[\.\!\?\'\,\:]",'',name)
    aux={'é':'e','ê':'e','ë':'e','á':'a','à':'a','â':'a','ã':'a','Å':'A','í':'i','î':'i','ú':'u','õ':'o'}
    for key in aux:
        name = re.sub(key,aux[key],name)
    return name

def makeURL(path, name):
    namelink=nameFormat(name)
    tm = Template("<a href=http://localhost:7777/{{path}}/{{namelink}}.html>{{name}}</a>")
    return tm.render(path=path, namelink=namelink,name=name)

def makeURLfromList(path, lista):
    r = []
    for name in lista:
        r.append(makeURL(path,name))
    return r

def makeDir(path):
    try:
        os.mkdir(path)
        print('criei diretoria: ' + path)
    except FileExistsError:
        print(path + " já exite!")

with open(argv[1]) as file:
    f=file.read()

jdata = json.loads(f)

filmes = {} #index.html
atores = {} #index.html
generos = {}
anos = {}
ator = {} #pagina ator

filecounter = 0
#genero = {} #pagina genero
#ano = {} #pagina ano

pathfilmes = 'Filmes'
makeDir('../'+pathfilmes)

for filme in jdata:
    aux = checkFstLetter(filme['title'])
    if aux[0]:
        filmes.setdefault('#', [])
        filmes['#'].append(filme['title'])
    else:
        filmes.setdefault(aux[1], [])
        filmes[aux[1]].append(filme['title'])

    #serve para o ano e para o index anos, cria ano a ano e uma geral
    anos.setdefault(filme['year'],[])
    anos[filme['year']].append(filme['title'])

    for ators in filme['cast']:
        #ver a primeira letra se é numeric se não upper dela e vê se já existe no dic (a letra ) se sim dá appende senão setdefault
        #print(ators + ': '+str(ators.find(r'\([A-Za-z]+\)')))
        if(ators[0].isalpha()):

            atores.setdefault(ators[0].upper(),[])
            if ators not in atores[ators[0].upper()]:
                atores[ators[0].upper()].append(ators)

            ator.setdefault(ators,[])
            ator[ators].append(filme['title'])

    for genere in filme['genres']:
        generos.setdefault(genere,[])
        generos[genere].append(filme['title'])


    #print(type(filme['year']))
    #print(writeTemplates.filme(filme['title'], makeURL('Year',str(filme['year'])), makeURLfromList('Actors',filme['cast']), makeURLfromList('Generos',filme['genres'])))

    try:
        with open('../'+pathfilmes + '/' + nameFormat(filme['title']) +'.html', 'w') as f:
            filecounter = filecounter + 1
            f.write(writeTemplates.filme(filme['title'], makeURL('Years',str(filme['year'])), makeURLfromList('Actors',filme['cast']), makeURLfromList('Generos',filme['genres'])))
    except FileNotFoundError:
            print("Diretoria não existe: " + pathfilmes + '/' + nameFormat(filme['title']) +'.html')

pathAtores = "Actors"
makeDir('../'+pathAtores)
for a in ator:
    #print(writeTemplates.entity(a,makeURLfromList(pathfilmes,ator[a])))

    try:
        with open('../' + pathAtores + '/' + nameFormat(a) +'.html', 'w') as f:
            filecounter = filecounter + 1
            f.write(writeTemplates.entity(a,makeURLfromList(pathfilmes,sorted(ator[a]))))
    except FileNotFoundError:
            print("Diretoria não existe: " + pathAtores + '/' + nameFormat(a) +'.html')

pathGeneros = "Generos"
makeDir('../'+pathGeneros)
for a in generos:
    #print(writeTemplates.entity(a,makeURLfromList(pathfilmes,sorted(generos[a]))))
    try:
        with open('../'+pathGeneros + '/' + nameFormat(a) +'.html', 'w') as f:
            filecounter = filecounter + 1
            f.write(writeTemplates.entity(a,makeURLfromList(pathfilmes,sorted(generos[a]))))
    except FileNotFoundError:
            print("Diretoria não existe: " + pathGeneros + '/' + nameFormat(a) +'.html')

pathYears = "Years"
makeDir('../'+pathYears)
for a in anos:
    #print(writeTemplates.entity(a,makeURLfromList(pathfilmes,sorted(anos[a]))))
    try:
        with open('../'+pathYears + '/' + str(a) +'.html', 'w') as f:
            filecounter = filecounter + 1
            f.write(writeTemplates.entity(a,makeURLfromList(pathfilmes,sorted(anos[a]))))
    except FileNotFoundError:
            print("Diretoria não existe: " + pathYears + '/' + nameFormat(a) +'.html')


######Index Pages######

#dar sort pela key
#dar sorte a cada um dos arrays
#aplicar makeURL a filmes, anos e generos

aux={}
for a in sorted(filmes):
    aux[a]=makeURLfromList('Filmes',sorted(filmes[a]))

filmes=aux


aux={}
for a in sorted(anos):
    aux[a]=makeURLfromList('Filmes',sorted(anos[a]))

anos=aux

aux={}
for a in sorted(generos):
    aux[a]=makeURLfromList('Filmes',sorted(generos[a]))

generos=aux

aux={}
for a in sorted(atores):
    aux[a]=makeURLfromList('Filmes',sorted(atores[a]))

atores=aux

#print(writeTemplates.index('Filmes',filmes))
try:
    with open('../'+pathfilmes + '/index.html', 'w') as f:
        filecounter = filecounter + 1
        f.write(writeTemplates.index('Filmes',filmes))
except FileNotFoundError:
        print("Diretoria não existe: " + pathfilmes + '/index.html')


#print(writeTemplates.index('Anos',anos))
try:
    with open('../'+pathYears + '/index.html', 'w') as f:
        filecounter = filecounter + 1
        f.write(writeTemplates.index('Anos',anos))
except FileNotFoundError:
        print("Diretoria não existe: " + pathYears + '/index.html')

#print(writeTemplates.index('Generos',generos))
try:
    with open('../'+pathGeneros + '/index.html', 'w') as f:
        filecounter = filecounter + 1
        f.write(writeTemplates.index('Generos',generos))
except FileNotFoundError:
        print("Diretoria não existe: " + pathGeneros + '/index.html')

try:
    with open('../'+pathAtores + '/index.html', 'w') as f:
        filecounter = filecounter + 1
        f.write(writeTemplates.index('Actors',atores))
except FileNotFoundError:
        print("Diretoria não existe: " + pathAtores + '/index.html')

print('Terminado. Foram criadas: ' + str(filecounter) + ' páginas HTML.')
