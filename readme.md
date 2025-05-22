$$generate pdf previews:$$
top portion of page:
$ convert -density 150 'pdfs/3091-final-exam-cheat-sheet.pdf[0]' -quality 90 -gravity north -crop 100%x50%+0+0 pdf-previews/3091-final-exam-cheat-sheet-preview.png

$$start server in terminal$$
python -m http.server 8000
-> server will be on http://localhost:8000/
