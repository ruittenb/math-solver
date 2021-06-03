
/**
 * Equation shapes:
 *
 * 0.  FactorSimple: x (x + p) = 0
 *
 * 1.  FactorSimple: x (x + p) = q
 *
 * 2.  FactorHard:   (x + p) (x + q) = 0
 *
 * 3.  FactorHard:   (x + p) (x + q) = r
 *
 * 4.  Square:       a x^2 = p
 *
 * 5.  SquareConst:  a x^2 + c = 0
 *
 * 6.  SquareConst:  a x^2 + c = p
 *
 * 7.  SquareLinear: a x^2 + b x = 0
 *
 * 8.  SquareLinear: a x^2 + b x = p
 *
 * 9.  Quadratic:    a x^2 + b x + c = 0
 *
 * 10. Quadratic:    a x^2 + b x + c = p
 */

const Equation = (function () {

    let value;

    const Equation = function () {
        this.generate();
    };

    Equation.prototype.generate = function () {
        const shape = Math.floor(Math.random() * 11)
        const rightMember = Math.floor(Math.random() * 10 - 5)
        switch (shape) {
            case 0:
                value = this.generateShapeFactorSimple(0);
                break;
            case 1:
                value = this.generateShapeFactorSimple(rightMember);
                break;
            case 2:
                value = this.generateShapeFactorHard(0);
                break;
            case 3:
                value = this.generateShapeFactorHard(rightMember);
                break;
            case 4:
                value = this.generateShapeSquare(rightMember);
                break;
            case 5:
                value = this.generateShapeSquareConst(0);
                break;
            case 6:
                value = this.generateShapeSquareConst(rightMember);
                break;
            case 7:
                value = this.generateShapeSquareLinear(0);
                break;
            case 8:
                value = this.generateShapeSquareLinear(rightMember);
                break;
            case 9:
                value = this.generateShapeQuadratic(0);
                break;
            case 10:
                value = this.generateShapeQuadratic(rightMember);
                break;
        }
    };

    return Equation;
})();

