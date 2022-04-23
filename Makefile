EMCC=emcc

all: cSolver.c
	$(EMCC) -O3 -s WASM=1 -s EXPORT_ES6=1 -s EXPORTED_RUNTIME_METHODS='["getValue", "setValue"]' -s EXPORTED_FUNCTIONS="['_calloc', '_Partition']" -o solverWASM.js cSolver.c