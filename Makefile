all:
	find pages -type f > pages.txt

clean:
	rm pages.txt
