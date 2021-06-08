
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
        // initialize with given value
		super(value);
        // store limit of random natural numbers
		this.setLimit(limit);
        // or generate new value
        if (!value) {
            this.generate();
        }
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
        let value;
        switch (shape) {
            case 0:
                value = this._generateShapeFactorSimple(0);
                break;
            case 1:
                value = this._generateShapeFactorSimple(rightMember);
                break;
            case 2:
                value = this._generateShapeFactorHard(0);
                break;
            case 3:
                value = this._generateShapeFactorHard(rightMember);
                break;
            case 4:
                value = this._generateShapeSquare(rightMember);
                break;
            case 5:
                value = this._generateShapeSquareConst(0);
                break;
            case 6:
                value = this._generateShapeSquareConst(rightMember);
                break;
            case 7:
                value = this._generateShapeSquareLinear(0);
                break;
            case 8:
                value = this._generateShapeSquareLinear(rightMember);
                break;
            case 9:
                value = this._generateShapeFullQuadratic(0);
                break;
            case 10:
                value = this._generateShapeFullQuadratic(rightMember);
                break;
        }
        this.setValue(value);
    };

    /* 0, 1 */
    _generateShapeFactorSimple(rightMember) {
        return this._equation(
            this._product(
                this._primitive('x'),
                this._sum(
                    this._primitive('x'),
                    this._randomNumberPrimitive()
                )
            ),
            this._primitive(rightMember)
        )
    }

    /* 2, 3 */
    _generateShapeFactorHard(rightMember) {
        return this._equation(
            this._product(
                this._sum(
                    this._primitive('x'),
                    this._randomNumberPrimitive()
                ),
                this._sum(
                    this._primitive('x'),
                    this._randomNumberPrimitive()
                )
            ),
            this._primitive(rightMember)
        )
    }

    /* 4 */
    _generateShapeSquare(rightMember) {
        return this._equation(
            this._product(
                this._randomNumberPrimitive(),
                this._power(
                    this._primitive('x'),
                    this._primitive('2')
                )
            ),
            this._primitive(rightMember)
        )
    }

    /* 5, 6 */
    _generateShapeSquareConst(rightMember) {
        return this._equation(
            this._sum(
                this._product(
                    this._randomNumberPrimitive(),
                    this._power(
                        this._primitive('x'),
                        this._primitive('2')
                    )
                ),
                this._randomNumberPrimitive()
            ),
            this._primitive(rightMember)
        )
    }

    /* 7, 8 */
    _generateShapeSquareLinear(rightMember) {
        return this._equation(
            this._sum(
                this._product(
                    this._randomNumberPrimitive(),
                    this._power(
                        this._primitive('x'),
                        this._primitive('2')
                    )
                ),
                this._product(
                    this._randomNumberPrimitive(),
                    this._primitive('x'),
                )
            ),
            this._primitive(rightMember)
        )
    }

    /* 9, 10 */
    _generateShapeFullQuadratic(rightMember) {
        return this._equation(
            this._sum(
                this._product(
                    this._randomNumberPrimitive(),
                    this._power(
                        this._primitive('x'),
                        this._primitive('2')
                    )
                ),
                this._product(
                    this._randomNumberPrimitive(),
                    this._primitive('x')
                ),
                this._randomNumberPrimitive(),
            ),
            this._primitive(rightMember)
        )
    }

    /** **********************************************************************
     * helpers: random numbers
     */

    //  n =>  -n .. n - 1     e.g.
    // 10 => -10 .. 9
    _random(n) {
        return Math.floor(Math.random() * n * 2 - n)
    }

    //  n =>  -n .. -1, 1 .. n       e.g.
    // 10 => -10 .. -1, 1 .. 10
    _randomNoZero(n) {
        const res = this._random(n);
        return res !== 0 ? res : n
    }

    // use this.limit
    _randomNumber() {
        return this._randomNoZero(this.limit);
    }

    // return random number as primitive node
    _randomNumberPrimitive() {
        return this._primitive(this._randomNumber());
    }
}

