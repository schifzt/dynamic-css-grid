#!/bin/bash
f=$1
ffmpeg -i ${f%.*}.mov -filter_complex "[0:v] fps=10,scale=640:-1,split [a][b];[a] palettegen [p];[b][p] paletteuse" ${f%.*}.gif

