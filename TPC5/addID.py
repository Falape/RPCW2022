import json


f = open("arq-son-EVO.json", 'r')

data = json.load(f)

id = 0

for value in data['musicas']:
    value['id']=id
    id += 1

print(data)

dataWrite = json.dumps(data)

t = open ('arq-son-EVO.json', 'w')
t.write(dataWrite)
