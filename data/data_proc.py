import csv
import json

h = {
    "labels": ["GDP per capita","Social support","Healthy life expectancy",
    "Freedom to make life choices","Generosity","Perceptions of corruption"],
    "datasets": [
        # insert per country data here
    ]
}

with open('happiness_2019.csv', 'r') as data:
    rows = csv.DictReader(data)
    
    for row in rows:
        country_data = {
            "label": row["Country or region"],
            "backgroundColor": "",
            "data": [row[i] for i in h["labels"]]
        }
        h["datasets"].append(country_data)

with open('happiness_2019.json', 'w') as f:
    json.dump(h, f)