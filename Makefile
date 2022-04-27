EMCC=emcc

all: cSolver.c
	$(EMCC) -O3 -s WASM=1 -o wasmSubset.js -s EXPORTED_RUNTIME_METHODS='["getValue", "setValue"]' -s EXPORTED_FUNCTIONS="['_Partition', '_calloc', '_free']" -s EXPORT_ES6=1 -s MODULARIZE=1 cSolver.c