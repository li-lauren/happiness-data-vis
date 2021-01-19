library('data.table')
library('dplyr')
library('purrr')

cutoff = 30
dts = list()
for (yyyy in c(2015:2019)){
    filename = sprintf('data/happiness_%s.csv', yyyy)
    dts[[as.character(yyyy)]] = fread(file=filename)
}

for (yyyy in c('2015', '2016')){

    dt = dts[[yyyy]]
    dt = dt[, .(country=Country, region=Region, score=get('Happiness Score'))]
    dts[[yyyy]] = dt[1:cutoff]
}

dt = dts[['2017']]
dt = dt[, .(country=Country, score=Happiness.Score)]
dts[['2017']] = dt[1:cutoff]

for (yyyy in c('2018', '2019')){

    dt = dts[[yyyy]]
    dt = dt[, .(country=get('Country or region'), score=Score)]
    dts[[yyyy]] = dt[1:cutoff]
}

dts2 = list()
for (yyyy in names(dts)){
    name = paste0('score_', yyyy)
    dt = dts[[yyyy]]
    if (yyyy %in% c('2015')){
        colnames(dt) = c('country', 'region', name)
    } else {
        dt = dt[, .(country, score)]
        colnames(dt) = c('country', name)
    }
    dts2[[yyyy]] = dt
}

my.merge = function(a,b){merge(a,b,by='country', all=TRUE)}
m = dts2 %>% reduce(my.merge)
m[, score_2017:=signif(score_2017, 4)]

write.csv(m, "data/top_countries.csv", quote=FALSE)
#dt = rbindlist(dts, idcol='year')
#dt = fread(file='data/happiness_2019.csv')

# colnames(dt) = c('rank','country','score', 'GDP','social_supp','life_exp',
#     'free_choice','generosity','corruption')

# # Correlations with score
# gdp_cor = dt[,cor(score, GDP)]

# # Select numeric columns
# num_cols = dt[, colnames(dt)[-c(1,2)], with=FALSE]

# # Compute pair-wise cross-sectional correlations
# print(cor(num_cols, num_cols))