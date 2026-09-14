# CV source

`resume.pdf` lives here and is built from this directory, not edited by hand.
It is served at <https://duo0301.github.io/cv/resume.pdf>; only the sources
in this folder are excluded from the Jekyll build.

    python3 prepare.py        # derives cv.bib + teaching.tex from the site sources
    tectonic -X compile cv.tex
    mv cv.pdf resume.pdf

`prepare.py` reads `_bibliography/papers.bib` and `_pages/teaching.md`, so the CV
cannot drift from the website. `cv.bib` and `teaching.tex` are generated - do not
edit them. Requires tectonic (`conda create -n texcv -c conda-forge tectonic`).
