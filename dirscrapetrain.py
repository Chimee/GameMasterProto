import os, csv

f=open("C:/Users/ceze/workspace/ERBCS/WebContent/traincon.txt",'w+')
try:
    w=csv.writer(f, delimiter='\t', quoting = csv.QUOTE_NONE)
    for path, dirs, files in os.walk("C:/Users/ceze/workspace/ERBCS/WebContent/public/train"):
        for filename in files:
            print ([filename])
            w.writerow([filename])

finally:
        f.close()
