import csv
import json
import seaborn as sns

h = {
    "labels": ["GDP per capita","Social support","Healthy life expectancy",
    "Freedom to make life choices","Generosity","Perceptions of corruption"],
    "datasets": [
        # insert per country data here
    ]
}

palette = sns.color_palette(None, 160)
with open('data/happiness_2019.csv', 'r') as data:
    rows = csv.DictReader(data)

    for row in rows:
        i = 0
        country_data = {
            "label": row["Country or region"],
            "backgroundColor": f"rgba{palette[i]}",
            "data": [row[i] for i in h["labels"]]
        }
        h["datasets"].append(country_data)
        i += 1

with open('public/happiness_2019.json', 'w') as f:
    json.dump(h, f, indent=4)