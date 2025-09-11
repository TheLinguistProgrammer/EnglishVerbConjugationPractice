import numpy as np
from pandas import read_csv

jcefr_data = read_csv("jcefr.csv", encoding="latin-1")
verbs_data = read_csv("verbs.csv", encoding="latin-1")


mylist = []
for i in range(len(verbs_data)):
    if len(list(jcefr_data[jcefr_data.headword==verbs_data.iat[i,0]].headword)) > 0:
        if verbs_data.iat[i,0] == list(jcefr_data[jcefr_data.headword==verbs_data.iat[i,0]].headword)[0]:
            mylist.append(verbs_data.iat[i,0])
            verbs_data.iat[i,5] = ", ".join(list(jcefr_data[jcefr_data.headword==verbs_data.iat[i,0]].CEFR))


verbs_data. to_csv('cefr_verbs_data.csv', index=False, encoding='utf-8')