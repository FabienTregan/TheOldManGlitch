chars = "ABCDEFGHIJKLMNOPQRSTUVWXYE():;[]abcdefghijklmnopqrstuvwxyzé"

text = "Kangaskhan"

resultat = ""
for (c of text) {
    i = chars.indexOf(c) + 0x80
    resultat += "" + i.toString(16) +" "
}

resultat = resultat + "50"
