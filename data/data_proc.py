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
    
    x = 0
    for row in rows:
        # scale color to rbg(0,255)
        color = (255*palette[x][0], 255*palette[x][1], 255*palette[x][2], 0.2)
        country_data = {
            "label": row["Country or region"],
            "backgroundColor": f"rgba{color}",
            "data": [row[i] for i in h["labels"]]
        }
        h["datasets"].append(country_data)
        x += 1

with open('public/happiness_2019.json', 'w') as f:
    json.dump(h, f, indent=4)