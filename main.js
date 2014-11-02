'use strict';

// Silly comment

(function(root) {

    var Point = function(x, y) {

        this.__toString = '(' + x + ',' + y + ')';

        Object.defineProperty(this, 'x', {
            value: x || 0,
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, 'y', {
            value: y || 0,
            writable: false,
            enumerable: true,
            configurable: false
        });

        this.plus = function(point) {
            var result = new Point(this.x + point.x, y + point.y);
            return result;
        };

        this.minus = function(point) {
            var result = new Point(x - point.x, y - point.y);
            return result;
        };
        this.min = function(point) {
            var result = new Point(Math.min(x, point.x), Math.min(y, point.y));
            return result;
        };
        this.max = function(point) {
            var result = new Point(Math.max(x, point.x), Math.max(y, point.y));
            return result;
        };
        this.distance = function(point) {
            var dx = point.x - x,
                dy = point.y - y,
                result = Math.sqrt((dx * dx) + (dy * dy));
            return result;
        };
        this.greaterThan = function(point) {
            var result = this.x > point.x && y > point.y;
            return result;
        };
        this.lessThan = function(point) {
            var result = this.x < point.x && y < point.y;
            return result;
        };
        this.greaterThanEqualTo = function(point) {
            var result = this.x >= point.x && y >= point.y;
            return result;
        };
        this.lessThanEqualTo = function(point) {
            var result = this.x <= point.x && y <= point.y;
            return result;
        };
        this.isContainedWithinRectangle = function(rect) {
            var result =
                this.x >= rect.origin.x &&
                this.y >= rect.origin.y &&
                this.x <= rect.origin.x + rect.extent.x &&
                this.y <= rect.origin.y + rect.extent.y;

            return result;
        };

        this.toString = function() {
            return this.__toString;
        };

    };
    Point.constructor = Point;

    var Rectangle = function(x, y, width, height) {

        var origin = new Point(x, y);
        var extent = new Point(width, height);
        this.__toString = '(' + origin.toString() + 'extent:' + extent.toString() + ')';

        Object.defineProperty(this, 'origin', {
            value: origin,
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(this, 'extent', {
            value: extent,
            writable: false,
            enumerable: true,
            configurable: false
        });

        this.toString = function() {
            return this.__toString;
        };

        this.top = function() {
            return this.origin.y;
        };

        this.left = function() {
            return this.origin.x;
        };

        this.bottom = function() {
            return this.top() + this.extent.y;
        };

        this.right = function() {
            return this.left() + this.extent.x;
        };

        this.width = function() {
            return this.extent.x;
        };

        this.height = function() {
            return this.extent.y;
        };

        this.corner = function() {
            var result = new Point(this.right(), this.bottom());
            return result;
        };

        this.area = function() {
            return this.extent.x * this.extent.y;
        };

        this.flattenXAt = function(x) {
            var o = this.origin;
            var e = this.extent;
            return new Rectangle(x, o.y, 0, e.y);
        };

        this.flattenYAt = function(y) {
            var o = this.origin;
            var e = this.extent;
            return new Rectangle(o.x, y, e.x, 0);
        };

        this.contains = function(pointOrRect) {
            var result = pointOrRect.isContainedWithinRectangle(this);
            return result;
        };

        this.isContainedWithinRectangle = function(rect) {
            var result = rect.origin.lessThanEqualTo(this.origin) && rect.corner().greaterThanEqualTo(this.corner());
            return result;
        };

        this.center = function() {
            //return the center point
            var x = this.origin.x + (this.extent.x / 2);
            var y = this.origin.y + (this.extent.y / 2);
            return new Point(x, y);
        };

        this.insetBy = function(thickness) {
            var result = new Rectangle(
                this.origin.x + thickness,
                this.origin.y + thickness,
                this.extent.x - 2 * thickness,
                this.extent.y - 2 * thickness);
            return result;
        };

        this.union = function(rectangle) {
            //answer a rectangle that contains the receiver and argment rectangles
            var anOrigin = this.origin.min(rectangle.origin),
                aCorner = this.corner().max(rectangle.corner()),
                width = aCorner.x - anOrigin.x,
                height = aCorner.y - anOrigin.y,
                result = new Rectangle(anOrigin.x, anOrigin.y, width, height);

            return result;
        };

        this.forEach = function(func) {
            var xstart = this.origin.x;
            var xstop = this.origin.x + this.extent.x;
            var ystart = this.origin.y;
            var ystop = this.origin.y + this.extent.y;
            for (var x = xstart; x < xstop; x++) {
                for (var y = ystart; y < ystop; y++) {
                    func(x, y);
                }
            }
        };

        this.intersect = function(rectangle, ifNoneAction) {
            //Answer a Rectangle that is the area in which the receiver overlaps with
            //rectangle. Optimized for speed
            var point = rectangle.origin,
                myCorner = this.corner(),
                left = null,
                right = null,
                top = null,
                bottom = null,
                result = null;

            if (ifNoneAction && !this.intersects(rectangle)) {
                return ifNoneAction.call(this, rectangle);
            }

            if (point.x > this.origin.x) {
                left = point.x;
            } else {
                left = this.origin.x;
            }

            if (point.y > this.origin.y) {
                top = point.y;
            } else {
                top = this.origin.y;
            }

            point = rectangle.corner();
            if (point.x < myCorner.x) {
                right = point.x;
            } else {
                right = myCorner.x;
            }

            if (point.y < myCorner.y) {
                bottom = point.y;
            } else {
                bottom = myCorner.y;
            }
            result = new Rectangle(left, top, right - left, bottom - top);
            return result;
        };

        this.intersects = function(rectangle) {
            //return true if we overlap, false otherwise

            var rOrigin = rectangle.origin,
                rCorner = rectangle.corner();

            if (rCorner.x <= this.origin.x) {
                return false;
            }
            if (rCorner.y <= this.origin.y) {
                return false;
            }
            if (rOrigin.x >= this.corner.x) {
                return false;
            }
            if (rOrigin.y >= this.corner.y) {
                return false;
            }
            return true;
        };
    };

    if (typeof(module) !== 'undefined' && module.exports) {
        module.exports = {
            Rectangle: Rectangle,
            Point: Point
        };
    } else {
        root.rectangles = {
            Rectangle: Rectangle,
            Point: Point
        };
    }
})(this); //jshint ignore:line
