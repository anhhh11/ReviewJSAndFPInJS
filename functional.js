(function () {
    var trace = R.curry(function (tag, x) {
        console.log(tag, x);
        return x;
    });

    /**
    * Identity functor
     */
    var Identity = function (x) {
        this.__value = x;
    }
    Identity.prototype.map = function (f) {
        return Identity.of(f(this.__value)); // Lay ra, bien doi bang f, dat lai vao hop -> bien doi gia tri trong hop
    }
    Identity.of = function (x) { return new Identity(x); }
    var id = function (f, m) {
        return f(m.__value);
    };

    /**
     * Maybe functor
     */
    var Maybe = function (x) {
        this.__value = x;
    };
    Maybe.of = function (x) { return new Maybe(x); }
    Maybe.prototype.isNothing = function (f) {
        return (this.__value === null) || (this.__value === undefined)
    };
    Maybe.prototype.map = function (f) {
        return this.isNothing() ? this : Maybe.of(f(this.__value));
    }
    var maybe = R.curry(function (x, f, m) {
        if (m.isNothing()) return x;
        return f(m.__value);
    });


    var Left = function (x) {
        this.__value = x;
    };
    Left.of = function (x) { return new Left(x); }
    Left.prototype.map = function (_) {
        return this;
    }
    var Right = function (x) {
        this.__value = x;
    }
    Right.of = function (x) { return new Right(x); }
    Right.prototype.map = function (_) {
        return Right.of(f(this.__value));
    }
    var either = R.curry(function (lf, rf, e) {
        switch (e.constructor) {
            case Left: return lf(e.__value);
            case Right: return rf(e.__value);
        };
    });


    /**
     * IO Functor
     */
    var IO = function (f) {
        this.unsafePerformIO = f;
    };
    IO.of = function (x) {
        return new IO(function () {
            return x;
        });
    };
    IO.prototype.map = function (f) {
        return new IO(R.pipe(this.unsafePerformIO, f));
    }



    var exports = {
        trace: trace,
        Identity: Identity,
        id: id,
        Maybe: Maybe,
        maybe: maybe,
        Left: Left,
        Right: Right,
        either: either,
        IO: IO
    };
    if (typeof R === 'undefined' && typeof _ === 'undefined') {
        throw new Exception("Require RamdaJS or LodashJS");
    }
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
        module.exports = exports;
    else
        window.fun = exports;
})()