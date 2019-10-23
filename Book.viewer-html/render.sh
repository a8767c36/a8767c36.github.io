

cd ../Book
#rm *.dvi *.log *.pdf *.toc *.aux
pdflatex document.tex
cp document.pdf ../Book.viewer-html/
cd ../Book.viewer-html
mkdir -p pages
convert -geometry 1600x1600 -density 200x200 -quality 100 document.pdf pages/page-%d.png
rm document.pdf
