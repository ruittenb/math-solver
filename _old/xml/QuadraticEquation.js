
/**
 * requires: Equation
 */

/**
 * QuadraticEquation shapes:
 *
 * 0.  FactorSimple:  x (x + p) = 0
 * 1.  FactorSimple:  x (x + p) = r
 * 2.  FactorHard:    (x + p) (x + q) = 0
 * 3.  FactorHard:    (x + p) (x + q) = r
 * 4.  Square:        a x^2 = r
 * 5.  SquareConst:   a x^2 + c = 0
 * 6.  SquareConst:   a x^2 + c = r
 * 7.  SquareLinear:  a x^2 + b x = 0
 * 8.  SquareLinear:  a x^2 + b x = r
 * 9.  FullQuadratic: a x^2 + b x + c = 0
 * 10. FullQuadratic: a x^2 + b x + c = r
 */

class QuadraticEquation extends Equation {

	constructor(value, limit) {
		super(value);
        // store limit of random natural numbers
		this.setLimit(limit);
	}

    /** **********************************************************************
     * setters
     */

    setLimit(limit) {
        this.limit = limit ? limit : 12;
    }

    /** **********************************************************************
     * generator functions
     */

    generate() {
        const shape = Math.floor(Math.random() * 11)
        const rightMember = this._randomNumber()
        switch (shape) {
            case 0:
                this.value = this._generateShapeFactorSimple(0);
                break;
            case 1:
                this.value = this._generateShapeFactorSimple(rightMember);
                break;
            case 2:
                this.value = this._generateShapeFactorHard(0);
                break;
            case 3:
                this.value = this._generateShapeFactorHard(rightMember);
                break;
            case 4:
                this.value = this._generateShapeSquare(rightMember);
                break;
            case 5:
                this.value = this._generateShapeSquareConst(0);
                break;
            case 6:
                this.value = this._generateShapeSquareConst(rightMember);
                break;
            case 7:
                this.value = this._generateShapeSquareLinear(0);
                break;
            case 8:
                this.value = this._generateShapeSquareLinear(rightMember);
                break;
            case 9:
                this.value = this._generateShapeFullQuadratic(0);
                break;
            case 10:
                this.value = this._generateShapeFullQuadratic(rightMember);
                break;
        }
    };

    _generateShapeFactorSimple(rightMember) {
        return this._equation(
            this._product(
                'x',
                this._sum('x', this._randomNumber())
            ),
            rightMember
        )
    }

    _generateShapeFactorHard(rightMember) {
        return this._equation(
            this._product(
                this._sum('x', this._randomNumber()),
                this._sum('x', this._randomNumber())
            ),
            rightMember
        )
    }

    _generateShapeSquare(rightMember) {
        return this._equation(
            this._product(
                this._randomNumber(),
                this._power('x', 2)
            ),
            rightMember
        )
    }

    _generateShapeSquareConst(rightMember) {
        return this._equation(
            this._sum(
                this._product(
                    this._randomNumber(),
                    this._power('x', 2)
                ),
                this._randomNumber()
            ),
            rightMember
        )
    }

    _generateShapeSquareLinear(rightMember) {
        return this._equation(
            this._sum(
                this._product(
                    this._randomNumber(),
                    this._power('x', 2)
                ),
                this._product(
                    this._randomNumber(),
                    'x'
                )
            ),
            rightMember
        )
    }

    _generateShapeFullQuadratic(rightMember) {
        return this._equation(
            this._sum(
                this._product(
                    this._randomNumber(),
                    this._power('x', 2)
                ),
                this._product(
                    this._randomNumber(),
                    'x'
                ),
                this._randomNumber(),
            ),
            rightMember
        )
    }

    /** **********************************************************************
     * helpers: random numbers
     */

    // 10 => -10 .. 9
    _random(n) {
        return Math.floor(Math.random() * n * 2 - n)
    }

    // 10 => -10 .. -1, 1 .. 10
    _randomNoZero(n) {
        const res = this._random(n);
        return res !== 0 ? res : n
    }

    // use this.value
    _randomNumber() {
        return this._randomNoZero(this.limit);
    }
}

