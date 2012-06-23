function multiplication(matrixA, matrixB) {
	// Coder le controle des matrices d'entrée
	
	//console.log('multiplication', matrixA, matrixB);
	
	var result = [];
	for(var i = 0 ; i < matrixA.length ; i++) {
		result[i] = [];
		var moa = matrixA[i];
		for(var j = 0 ; j < matrixA[i].length ; j++) {
			var mob = composeMatrixOne(matrixB, j);
			result[i][j] = multiplicationMatrixOne(moa, mob);
		}
	}
	return result;
}

function composeMatrixOne(matrix, index) {
	//console.log('composeMatrixOne', matrix, index);
	var result = [];
	for(var i = 0 ; i < matrix[index].length ; i++) {
		result[i] = matrix[index][i];
	}
	return result;
}

function multiplicationMatrixOne(matrixA, matrixB) {
	//console.log('multiplicationMatrixOne', matrixA, matrixB);
	var result = 0;
	for(var i = 0 ; i < matrixA.length ; i++) {
		result += matrixA[i] * matrixB[0];
	}
	return result;
}