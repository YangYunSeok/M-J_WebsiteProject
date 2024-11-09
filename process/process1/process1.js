/*------------------------------------*\
       Plugins - Table of contents
   \*------------------------------------*/
/*
 - jQuery UI
 - Slick Slider
 - HC-Sticky
 - Scroll Spy
 - Parallax
 - Menu on scroll
 - anime.js
 - Jarallax
*/

/*! jQuery UI - v1.13.1 - 2022-02-28
 * http://jqueryui.com
 * Includes: effect.js
 * Copyright jQuery Foundation and other contributors; Licensed MIT */

!(function (t) {
  "use strict";
  "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery);
})(function (u) {
  "use strict";
  u.ui = u.ui || {};
  u.ui.version = "1.13.1";
  var a = u,
    n = {},
    e = n.toString,
    f = /^([\-+])=\s*(\d+\.?\d*)/,
    t = [
      {
        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function (t) {
          return [t[1], t[2], t[3], t[4]];
        },
      },
      {
        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        parse: function (t) {
          return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
        },
      },
      {
        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})?/,
        parse: function (t) {
          return [
            parseInt(t[1], 16),
            parseInt(t[2], 16),
            parseInt(t[3], 16),
            t[4] ? (parseInt(t[4], 16) / 255).toFixed(2) : 1,
          ];
        },
      },
      {
        re: /#([a-f0-9])([a-f0-9])([a-f0-9])([a-f0-9])?/,
        parse: function (t) {
          return [
            parseInt(t[1] + t[1], 16),
            parseInt(t[2] + t[2], 16),
            parseInt(t[3] + t[3], 16),
            t[4] ? (parseInt(t[4] + t[4], 16) / 255).toFixed(2) : 1,
          ];
        },
      },
      {
        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
        space: "hsla",
        parse: function (t) {
          return [t[1], t[2] / 100, t[3] / 100, t[4]];
        },
      },
    ],
    l = (a.Color = function (t, e, n, r) {
      return new a.Color.fn.parse(t, e, n, r);
    }),
    d = {
      rgba: {
        props: {
          red: { idx: 0, type: "byte" },
          green: { idx: 1, type: "byte" },
          blue: { idx: 2, type: "byte" },
        },
      },
      hsla: {
        props: {
          hue: { idx: 0, type: "degrees" },
          saturation: { idx: 1, type: "percent" },
          lightness: { idx: 2, type: "percent" },
        },
      },
    },
    p = {
      byte: { floor: !0, max: 255 },
      percent: { max: 1 },
      degrees: { mod: 360, floor: !0 },
    },
    s = (l.support = {}),
    r = a("<p>")[0],
    h = a.each;
  function g(t) {
    return null == t
      ? t + ""
      : "object" == typeof t
      ? n[e.call(t)] || "object"
      : typeof t;
  }
  function m(t, e, n) {
    var r = p[e.type] || {};
    return null == t
      ? n || !e.def
        ? null
        : e.def
      : ((t = r.floor ? ~~t : parseFloat(t)),
        isNaN(t)
          ? e.def
          : r.mod
          ? (t + r.mod) % r.mod
          : Math.min(r.max, Math.max(0, t)));
  }
  function c(r) {
    var o = l(),
      i = (o._rgba = []);
    return (
      (r = r.toLowerCase()),
      h(t, function (t, e) {
        var n = e.re.exec(r),
          n = n && e.parse(n),
          e = e.space || "rgba";
        if (n)
          return (
            (n = o[e](n)),
            (o[d[e].cache] = n[d[e].cache]),
            (i = o._rgba = n._rgba),
            !1
          );
      }),
      i.length
        ? ("0,0,0,0" === i.join() && a.extend(i, M.transparent), o)
        : M[r]
    );
  }
  function o(t, e, n) {
    return 6 * (n = (n + 1) % 1) < 1
      ? t + (e - t) * n * 6
      : 2 * n < 1
      ? e
      : 3 * n < 2
      ? t + (e - t) * (2 / 3 - n) * 6
      : t;
  }
  (r.style.cssText = "background-color:rgba(1,1,1,.5)"),
    (s.rgba = -1 < r.style.backgroundColor.indexOf("rgba")),
    h(d, function (t, e) {
      (e.cache = "_" + t),
        (e.props.alpha = { idx: 3, type: "percent", def: 1 });
    }),
    a.each(
      "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
        " "
      ),
      function (t, e) {
        n["[object " + e + "]"] = e.toLowerCase();
      }
    ),
    ((l.fn = a.extend(l.prototype, {
      parse: function (o, t, e, n) {
        if (void 0 === o) return (this._rgba = [null, null, null, null]), this;
        (o.jquery || o.nodeType) && ((o = a(o).css(t)), (t = void 0));
        var i = this,
          r = g(o),
          s = (this._rgba = []);
        return (
          void 0 !== t && ((o = [o, t, e, n]), (r = "array")),
          "string" === r
            ? this.parse(c(o) || M._default)
            : "array" === r
            ? (h(d.rgba.props, function (t, e) {
                s[e.idx] = m(o[e.idx], e);
              }),
              this)
            : "object" === r
            ? (h(
                d,
                o instanceof l
                  ? function (t, e) {
                      o[e.cache] && (i[e.cache] = o[e.cache].slice());
                    }
                  : function (t, n) {
                      var r = n.cache;
                      h(n.props, function (t, e) {
                        if (!i[r] && n.to) {
                          if ("alpha" === t || null == o[t]) return;
                          i[r] = n.to(i._rgba);
                        }
                        i[r][e.idx] = m(o[t], e, !0);
                      }),
                        i[r] &&
                          a.inArray(null, i[r].slice(0, 3)) < 0 &&
                          (null == i[r][3] && (i[r][3] = 1),
                          n.from && (i._rgba = n.from(i[r])));
                    }
              ),
              this)
            : void 0
        );
      },
      is: function (t) {
        var o = l(t),
          i = !0,
          s = this;
        return (
          h(d, function (t, e) {
            var n,
              r = o[e.cache];
            return (
              r &&
                ((n = s[e.cache] || (e.to && e.to(s._rgba)) || []),
                h(e.props, function (t, e) {
                  if (null != r[e.idx]) return (i = r[e.idx] === n[e.idx]);
                })),
              i
            );
          }),
          i
        );
      },
      _space: function () {
        var n = [],
          r = this;
        return (
          h(d, function (t, e) {
            r[e.cache] && n.push(t);
          }),
          n.pop()
        );
      },
      transition: function (t, s) {
        var e = (f = l(t))._space(),
          n = d[e],
          t = 0 === this.alpha() ? l("transparent") : this,
          a = t[n.cache] || n.to(t._rgba),
          c = a.slice(),
          f = f[n.cache];
        return (
          h(n.props, function (t, e) {
            var n = e.idx,
              r = a[n],
              o = f[n],
              i = p[e.type] || {};
            null !== o &&
              (null === r
                ? (c[n] = o)
                : (i.mod &&
                    (o - r > i.mod / 2
                      ? (r += i.mod)
                      : r - o > i.mod / 2 && (r -= i.mod)),
                  (c[n] = m((o - r) * s + r, e))));
          }),
          this[e](c)
        );
      },
      blend: function (t) {
        if (1 === this._rgba[3]) return this;
        var e = this._rgba.slice(),
          n = e.pop(),
          r = l(t)._rgba;
        return l(
          a.map(e, function (t, e) {
            return (1 - n) * r[e] + n * t;
          })
        );
      },
      toRgbaString: function () {
        var t = "rgba(",
          e = a.map(this._rgba, function (t, e) {
            return null != t ? t : 2 < e ? 1 : 0;
          });
        return 1 === e[3] && (e.pop(), (t = "rgb(")), t + e.join() + ")";
      },
      toHslaString: function () {
        var t = "hsla(",
          e = a.map(this.hsla(), function (t, e) {
            return (
              null == t && (t = 2 < e ? 1 : 0),
              (t = e && e < 3 ? Math.round(100 * t) + "%" : t)
            );
          });
        return 1 === e[3] && (e.pop(), (t = "hsl(")), t + e.join() + ")";
      },
      toHexString: function (t) {
        var e = this._rgba.slice(),
          n = e.pop();
        return (
          t && e.push(~~(255 * n)),
          "#" +
            a
              .map(e, function (t) {
                return 1 === (t = (t || 0).toString(16)).length ? "0" + t : t;
              })
              .join("")
        );
      },
      toString: function () {
        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString();
      },
    })).parse.prototype = l.fn),
    (d.hsla.to = function (t) {
      if (null == t[0] || null == t[1] || null == t[2])
        return [null, null, null, t[3]];
      var e = t[0] / 255,
        n = t[1] / 255,
        r = t[2] / 255,
        o = t[3],
        i = Math.max(e, n, r),
        s = Math.min(e, n, r),
        a = i - s,
        c = i + s,
        t = 0.5 * c,
        n =
          s === i
            ? 0
            : e === i
            ? (60 * (n - r)) / a + 360
            : n === i
            ? (60 * (r - e)) / a + 120
            : (60 * (e - n)) / a + 240,
        c = 0 == a ? 0 : t <= 0.5 ? a / c : a / (2 - c);
      return [Math.round(n) % 360, c, t, null == o ? 1 : o];
    }),
    (d.hsla.from = function (t) {
      if (null == t[0] || null == t[1] || null == t[2])
        return [null, null, null, t[3]];
      var e = t[0] / 360,
        n = t[1],
        r = t[2],
        t = t[3],
        n = r <= 0.5 ? r * (1 + n) : r + n - r * n,
        r = 2 * r - n;
      return [
        Math.round(255 * o(r, n, e + 1 / 3)),
        Math.round(255 * o(r, n, e)),
        Math.round(255 * o(r, n, e - 1 / 3)),
        t,
      ];
    }),
    h(d, function (c, t) {
      var e = t.props,
        i = t.cache,
        s = t.to,
        a = t.from;
      (l.fn[c] = function (t) {
        if ((s && !this[i] && (this[i] = s(this._rgba)), void 0 === t))
          return this[i].slice();
        var n = g(t),
          r = "array" === n || "object" === n ? t : arguments,
          o = this[i].slice();
        return (
          h(e, function (t, e) {
            t = r["object" === n ? t : e.idx];
            null == t && (t = o[e.idx]), (o[e.idx] = m(t, e));
          }),
          a ? (((t = l(a(o)))[i] = o), t) : l(o)
        );
      }),
        h(e, function (s, a) {
          l.fn[s] ||
            (l.fn[s] = function (t) {
              var e,
                n = g(t),
                r = "alpha" === s ? (this._hsla ? "hsla" : "rgba") : c,
                o = this[r](),
                i = o[a.idx];
              return "undefined" === n
                ? i
                : ("function" === n && (n = g((t = t.call(this, i)))),
                  null == t && a.empty
                    ? this
                    : ("string" === n &&
                        (e = f.exec(t)) &&
                        (t = i + parseFloat(e[2]) * ("+" === e[1] ? 1 : -1)),
                      (o[a.idx] = t),
                      this[r](o)));
            });
        });
    }),
    (l.hook = function (t) {
      t = t.split(" ");
      h(t, function (t, i) {
        (a.cssHooks[i] = {
          set: function (t, e) {
            var n,
              r,
              o = "";
            if ("transparent" !== e && ("string" !== g(e) || (n = c(e)))) {
              if (((e = l(n || e)), !s.rgba && 1 !== e._rgba[3])) {
                for (
                  r = "backgroundColor" === i ? t.parentNode : t;
                  ("" === o || "transparent" === o) && r && r.style;

                )
                  try {
                    (o = a.css(r, "backgroundColor")), (r = r.parentNode);
                  } catch (t) {}
                e = e.blend(o && "transparent" !== o ? o : "_default");
              }
              e = e.toRgbaString();
            }
            try {
              t.style[i] = e;
            } catch (t) {}
          },
        }),
          (a.fx.step[i] = function (t) {
            t.colorInit ||
              ((t.start = l(t.elem, i)),
              (t.end = l(t.end)),
              (t.colorInit = !0)),
              a.cssHooks[i].set(t.elem, t.start.transition(t.end, t.pos));
          });
      });
    })(
      "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"
    ),
    (a.cssHooks.borderColor = {
      expand: function (n) {
        var r = {};
        return (
          h(["Top", "Right", "Bottom", "Left"], function (t, e) {
            r["border" + e + "Color"] = n;
          }),
          r
        );
      },
    });
  var i,
    b,
    y,
    v,
    x,
    C,
    w,
    k,
    _,
    S,
    M = (a.Color.names = {
      aqua: "#00ffff",
      black: "#000000",
      blue: "#0000ff",
      fuchsia: "#ff00ff",
      gray: "#808080",
      green: "#008000",
      lime: "#00ff00",
      maroon: "#800000",
      navy: "#000080",
      olive: "#808000",
      purple: "#800080",
      red: "#ff0000",
      silver: "#c0c0c0",
      teal: "#008080",
      white: "#ffffff",
      yellow: "#ffff00",
      transparent: [null, null, null, 0],
      _default: "#ffffff",
    }),
    j = "ui-effects-",
    B = "ui-effects-style",
    I = "ui-effects-animated";
  function H(t) {
    var e,
      n,
      r = t.ownerDocument.defaultView
        ? t.ownerDocument.defaultView.getComputedStyle(t, null)
        : t.currentStyle,
      o = {};
    if (r && r.length && r[0] && r[r[0]])
      for (n = r.length; n--; )
        "string" == typeof r[(e = r[n])] &&
          (o[
            e.replace(/-([\da-z])/gi, function (t, e) {
              return e.toUpperCase();
            })
          ] = r[e]);
    else for (e in r) "string" == typeof r[e] && (o[e] = r[e]);
    return o;
  }
  function T(t, e, n, r) {
    return (
      (t = { effect: (t = u.isPlainObject(t) ? (e = t).effect : t) }),
      "function" == typeof (e = null == e ? {} : e) &&
        ((r = e), (n = null), (e = {})),
      ("number" != typeof e && !u.fx.speeds[e]) || ((r = n), (n = e), (e = {})),
      "function" == typeof n && ((r = n), (n = null)),
      e && u.extend(t, e),
      (n = n || e.duration),
      (t.duration = u.fx.off
        ? 0
        : "number" == typeof n
        ? n
        : n in u.fx.speeds
        ? u.fx.speeds[n]
        : u.fx.speeds._default),
      (t.complete = r || e.complete),
      t
    );
  }
  function W(t) {
    return (
      !t ||
      "number" == typeof t ||
      u.fx.speeds[t] ||
      ("string" == typeof t && !u.effects.effect[t]) ||
      "function" == typeof t ||
      ("object" == typeof t && !t.effect)
    );
  }
  function R(t, e) {
    var n = e.outerWidth(),
      e = e.outerHeight(),
      t =
        /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(
          t
        ) || ["", 0, n, e, 0];
    return {
      top: parseFloat(t[1]) || 0,
      right: "auto" === t[2] ? n : parseFloat(t[2]),
      bottom: "auto" === t[3] ? e : parseFloat(t[3]),
      left: parseFloat(t[4]) || 0,
    };
  }
  (u.effects = { effect: {} }),
    (v = ["add", "remove", "toggle"]),
    (x = {
      border: 1,
      borderBottom: 1,
      borderColor: 1,
      borderLeft: 1,
      borderRight: 1,
      borderTop: 1,
      borderWidth: 1,
      margin: 1,
      padding: 1,
    }),
    u.each(
      [
        "borderLeftStyle",
        "borderRightStyle",
        "borderBottomStyle",
        "borderTopStyle",
      ],
      function (t, e) {
        u.fx.step[e] = function (t) {
          (("none" !== t.end && !t.setAttr) || (1 === t.pos && !t.setAttr)) &&
            (a.style(t.elem, e, t.end), (t.setAttr = !0));
        };
      }
    ),
    u.fn.addBack ||
      (u.fn.addBack = function (t) {
        return this.add(
          null == t ? this.prevObject : this.prevObject.filter(t)
        );
      }),
    (u.effects.animateClass = function (o, t, e, n) {
      var i = u.speed(t, e, n);
      return this.queue(function () {
        var n = u(this),
          t = n.attr("class") || "",
          e = (e = i.children ? n.find("*").addBack() : n).map(function () {
            return { el: u(this), start: H(this) };
          }),
          r = function () {
            u.each(v, function (t, e) {
              o[e] && n[e + "Class"](o[e]);
            });
          };
        r(),
          (e = e.map(function () {
            return (
              (this.end = H(this.el[0])),
              (this.diff = (function (t, e) {
                var n,
                  r,
                  o = {};
                for (n in e)
                  (r = e[n]),
                    t[n] !== r &&
                      (x[n] ||
                        (!u.fx.step[n] && isNaN(parseFloat(r))) ||
                        (o[n] = r));
                return o;
              })(this.start, this.end)),
              this
            );
          })),
          n.attr("class", t),
          (e = e.map(function () {
            var t = this,
              e = u.Deferred(),
              n = u.extend({}, i, {
                queue: !1,
                complete: function () {
                  e.resolve(t);
                },
              });
            return this.el.animate(this.diff, n), e.promise();
          })),
          u.when.apply(u, e.get()).done(function () {
            r(),
              u.each(arguments, function () {
                var e = this.el;
                u.each(this.diff, function (t) {
                  e.css(t, "");
                });
              }),
              i.complete.call(n[0]);
          });
      });
    }),
    u.fn.extend({
      addClass:
        ((y = u.fn.addClass),
        function (t, e, n, r) {
          return e
            ? u.effects.animateClass.call(this, { add: t }, e, n, r)
            : y.apply(this, arguments);
        }),
      removeClass:
        ((b = u.fn.removeClass),
        function (t, e, n, r) {
          return 1 < arguments.length
            ? u.effects.animateClass.call(this, { remove: t }, e, n, r)
            : b.apply(this, arguments);
        }),
      toggleClass:
        ((i = u.fn.toggleClass),
        function (t, e, n, r, o) {
          return "boolean" == typeof e || void 0 === e
            ? n
              ? u.effects.animateClass.call(
                  this,
                  e ? { add: t } : { remove: t },
                  n,
                  r,
                  o
                )
              : i.apply(this, arguments)
            : u.effects.animateClass.call(this, { toggle: t }, e, n, r);
        }),
      switchClass: function (t, e, n, r, o) {
        return u.effects.animateClass.call(
          this,
          { add: e, remove: t },
          n,
          r,
          o
        );
      },
    }),
    u.expr &&
      u.expr.pseudos &&
      u.expr.pseudos.animated &&
      (u.expr.pseudos.animated =
        ((C = u.expr.pseudos.animated),
        function (t) {
          return !!u(t).data(I) || C(t);
        })),
    !1 !== u.uiBackCompat &&
      u.extend(u.effects, {
        save: function (t, e) {
          for (var n = 0, r = e.length; n < r; n++)
            null !== e[n] && t.data(j + e[n], t[0].style[e[n]]);
        },
        restore: function (t, e) {
          for (var n, r = 0, o = e.length; r < o; r++)
            null !== e[r] && ((n = t.data(j + e[r])), t.css(e[r], n));
        },
        setMode: function (t, e) {
          return (e = "toggle" === e ? (t.is(":hidden") ? "show" : "hide") : e);
        },
        createWrapper: function (n) {
          if (n.parent().is(".ui-effects-wrapper")) return n.parent();
          var r = {
              width: n.outerWidth(!0),
              height: n.outerHeight(!0),
              float: n.css("float"),
            },
            t = u("<div></div>").addClass("ui-effects-wrapper").css({
              fontSize: "100%",
              background: "transparent",
              border: "none",
              margin: 0,
              padding: 0,
            }),
            e = { width: n.width(), height: n.height() },
            o = document.activeElement;
          try {
            o.id;
          } catch (t) {
            o = document.body;
          }
          return (
            n.wrap(t),
            (n[0] !== o && !u.contains(n[0], o)) || u(o).trigger("focus"),
            (t = n.parent()),
            "static" === n.css("position")
              ? (t.css({ position: "relative" }),
                n.css({ position: "relative" }))
              : (u.extend(r, {
                  position: n.css("position"),
                  zIndex: n.css("z-index"),
                }),
                u.each(["top", "left", "bottom", "right"], function (t, e) {
                  (r[e] = n.css(e)),
                    isNaN(parseInt(r[e], 10)) && (r[e] = "auto");
                }),
                n.css({
                  position: "relative",
                  top: 0,
                  left: 0,
                  right: "auto",
                  bottom: "auto",
                })),
            n.css(e),
            t.css(r).show()
          );
        },
        removeWrapper: function (t) {
          var e = document.activeElement;
          return (
            t.parent().is(".ui-effects-wrapper") &&
              (t.parent().replaceWith(t),
              (t[0] !== e && !u.contains(t[0], e)) || u(e).trigger("focus")),
            t
          );
        },
      }),
    u.extend(u.effects, {
      version: "1.13.1",
      define: function (t, e, n) {
        return (
          n || ((n = e), (e = "effect")),
          (u.effects.effect[t] = n),
          (u.effects.effect[t].mode = e),
          n
        );
      },
      scaledDimensions: function (t, e, n) {
        if (0 === e)
          return { height: 0, width: 0, outerHeight: 0, outerWidth: 0 };
        var r = "horizontal" !== n ? (e || 100) / 100 : 1,
          e = "vertical" !== n ? (e || 100) / 100 : 1;
        return {
          height: t.height() * e,
          width: t.width() * r,
          outerHeight: t.outerHeight() * e,
          outerWidth: t.outerWidth() * r,
        };
      },
      clipToBox: function (t) {
        return {
          width: t.clip.right - t.clip.left,
          height: t.clip.bottom - t.clip.top,
          left: t.clip.left,
          top: t.clip.top,
        };
      },
      unshift: function (t, e, n) {
        var r = t.queue();
        1 < e && r.splice.apply(r, [1, 0].concat(r.splice(e, n))), t.dequeue();
      },
      saveStyle: function (t) {
        t.data(B, t[0].style.cssText);
      },
      restoreStyle: function (t) {
        (t[0].style.cssText = t.data(B) || ""), t.removeData(B);
      },
      mode: function (t, e) {
        t = t.is(":hidden");
        return (
          "toggle" === e && (e = t ? "show" : "hide"),
          (e = (t ? "hide" === e : "show" === e) ? "none" : e)
        );
      },
      getBaseline: function (t, e) {
        var n, r;
        switch (t[0]) {
          case "top":
            n = 0;
            break;
          case "middle":
            n = 0.5;
            break;
          case "bottom":
            n = 1;
            break;
          default:
            n = t[0] / e.height;
        }
        switch (t[1]) {
          case "left":
            r = 0;
            break;
          case "center":
            r = 0.5;
            break;
          case "right":
            r = 1;
            break;
          default:
            r = t[1] / e.width;
        }
        return { x: r, y: n };
      },
      createPlaceholder: function (t) {
        var e,
          n = t.css("position"),
          r = t.position();
        return (
          t
            .css({
              marginTop: t.css("marginTop"),
              marginBottom: t.css("marginBottom"),
              marginLeft: t.css("marginLeft"),
              marginRight: t.css("marginRight"),
            })
            .outerWidth(t.outerWidth())
            .outerHeight(t.outerHeight()),
          /^(static|relative)/.test(n) &&
            ((n = "absolute"),
            (e = u("<" + t[0].nodeName + ">")
              .insertAfter(t)
              .css({
                display: /^(inline|ruby)/.test(t.css("display"))
                  ? "inline-block"
                  : "block",
                visibility: "hidden",
                marginTop: t.css("marginTop"),
                marginBottom: t.css("marginBottom"),
                marginLeft: t.css("marginLeft"),
                marginRight: t.css("marginRight"),
                float: t.css("float"),
              })
              .outerWidth(t.outerWidth())
              .outerHeight(t.outerHeight())
              .addClass("ui-effects-placeholder")),
            t.data(j + "placeholder", e)),
          t.css({ position: n, left: r.left, top: r.top }),
          e
        );
      },
      removePlaceholder: function (t) {
        var e = j + "placeholder",
          n = t.data(e);
        n && (n.remove(), t.removeData(e));
      },
      cleanUp: function (t) {
        u.effects.restoreStyle(t), u.effects.removePlaceholder(t);
      },
      setTransition: function (r, t, o, i) {
        return (
          (i = i || {}),
          u.each(t, function (t, e) {
            var n = r.cssUnit(e);
            0 < n[0] && (i[e] = n[0] * o + n[1]);
          }),
          i
        );
      },
    }),
    u.fn.extend({
      effect: function () {
        function t(t) {
          var e = u(this),
            n = u.effects.mode(e, a) || i;
          e.data(I, !0),
            c.push(n),
            i && ("show" === n || (n === i && "hide" === n)) && e.show(),
            (i && "none" === n) || u.effects.saveStyle(e),
            "function" == typeof t && t();
        }
        var r = T.apply(this, arguments),
          o = u.effects.effect[r.effect],
          i = o.mode,
          e = r.queue,
          n = e || "fx",
          s = r.complete,
          a = r.mode,
          c = [];
        return u.fx.off || !o
          ? a
            ? this[a](r.duration, s)
            : this.each(function () {
                s && s.call(this);
              })
          : !1 === e
          ? this.each(t).each(f)
          : this.queue(n, t).queue(n, f);
        function f(t) {
          var e = u(this);
          function n() {
            "function" == typeof s && s.call(e[0]),
              "function" == typeof t && t();
          }
          (r.mode = c.shift()),
            !1 === u.uiBackCompat || i
              ? "none" === r.mode
                ? (e[a](), n())
                : o.call(e[0], r, function () {
                    e.removeData(I),
                      u.effects.cleanUp(e),
                      "hide" === r.mode && e.hide(),
                      n();
                  })
              : (e.is(":hidden") ? "hide" === a : "show" === a)
              ? (e[a](), n())
              : o.call(e[0], r, n);
        }
      },
      show:
        ((_ = u.fn.show),
        function (t) {
          if (W(t)) return _.apply(this, arguments);
          t = T.apply(this, arguments);
          return (t.mode = "show"), this.effect.call(this, t);
        }),
      hide:
        ((k = u.fn.hide),
        function (t) {
          if (W(t)) return k.apply(this, arguments);
          t = T.apply(this, arguments);
          return (t.mode = "hide"), this.effect.call(this, t);
        }),
      toggle:
        ((w = u.fn.toggle),
        function (t) {
          if (W(t) || "boolean" == typeof t) return w.apply(this, arguments);
          t = T.apply(this, arguments);
          return (t.mode = "toggle"), this.effect.call(this, t);
        }),
      cssUnit: function (t) {
        var n = this.css(t),
          r = [];
        return (
          u.each(["em", "px", "%", "pt"], function (t, e) {
            0 < n.indexOf(e) && (r = [parseFloat(n), e]);
          }),
          r
        );
      },
      cssClip: function (t) {
        return t
          ? this.css(
              "clip",
              "rect(" +
                t.top +
                "px " +
                t.right +
                "px " +
                t.bottom +
                "px " +
                t.left +
                "px)"
            )
          : R(this.css("clip"), this);
      },
      transfer: function (t, e) {
        var n = u(this),
          r = u(t.to),
          o = "fixed" === r.css("position"),
          i = u("body"),
          s = o ? i.scrollTop() : 0,
          a = o ? i.scrollLeft() : 0,
          i = r.offset(),
          i = {
            top: i.top - s,
            left: i.left - a,
            height: r.innerHeight(),
            width: r.innerWidth(),
          },
          r = n.offset(),
          c = u("<div class='ui-effects-transfer'></div>");
        c.appendTo("body")
          .addClass(t.className)
          .css({
            top: r.top - s,
            left: r.left - a,
            height: n.innerHeight(),
            width: n.innerWidth(),
            position: o ? "fixed" : "absolute",
          })
          .animate(i, t.duration, t.easing, function () {
            c.remove(), "function" == typeof e && e();
          });
      },
    }),
    (u.fx.step.clip = function (t) {
      t.clipInit ||
        ((t.start = u(t.elem).cssClip()),
        "string" == typeof t.end && (t.end = R(t.end, t.elem)),
        (t.clipInit = !0)),
        u(t.elem).cssClip({
          top: t.pos * (t.end.top - t.start.top) + t.start.top,
          right: t.pos * (t.end.right - t.start.right) + t.start.right,
          bottom: t.pos * (t.end.bottom - t.start.bottom) + t.start.bottom,
          left: t.pos * (t.end.left - t.start.left) + t.start.left,
        });
    }),
    (S = {}),
    u.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function (e, t) {
      S[t] = function (t) {
        return Math.pow(t, e + 2);
      };
    }),
    u.extend(S, {
      Sine: function (t) {
        return 1 - Math.cos((t * Math.PI) / 2);
      },
      Circ: function (t) {
        return 1 - Math.sqrt(1 - t * t);
      },
      Elastic: function (t) {
        return 0 === t || 1 === t
          ? t
          : -Math.pow(2, 8 * (t - 1)) *
              Math.sin(((80 * (t - 1) - 7.5) * Math.PI) / 15);
      },
      Back: function (t) {
        return t * t * (3 * t - 2);
      },
      Bounce: function (t) {
        for (var e, n = 4; t < ((e = Math.pow(2, --n)) - 1) / 11; );
        return (
          1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
        );
      },
    }),
    u.each(S, function (t, e) {
      (u.easing["easeIn" + t] = e),
        (u.easing["easeOut" + t] = function (t) {
          return 1 - e(1 - t);
        }),
        (u.easing["easeInOut" + t] = function (t) {
          return t < 0.5 ? e(2 * t) / 2 : 1 - e(-2 * t + 2) / 2;
        });
    });
  u.effects;
});

/* Slick Slider */
!(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  ((e = (function () {
    var e = 0;
    return function (t, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(t)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(t).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        void 0 !== document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : void 0 !== document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = e++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    };
  })()).prototype.activateADA = function () {
    this.$slideTrack
      .find(".slick-active")
      .attr({ "aria-hidden": "false" })
      .find("a, input, button, select")
      .attr({ tabindex: "0" });
  }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : !0 === o
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled
          ? !1 === s.options.vertical
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : !1 === s.cssTransitions
          ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    !1 === s.options.vertical
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                },
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            !1 === s.options.vertical
              ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor;
      return t && null !== t && (t = i(t).not(e.$slider)), t;
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this.getNavTarget();
      null !== t &&
        "object" == typeof t &&
        t.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      !1 === e.options.fade
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (!1 === i.options.infinite &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      !0 === e.options.arrows &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            !0 !== e.options.infinite &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (!0 === o.options.dots) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        !0 === e.options.draggable && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 1)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
          ? (n = d)
          : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (!1 === r.originalSettings.mobileFirst
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        (n = r.slideCount % r.options.slidesToScroll != 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t);
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e, t;
      if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var o in e) {
          if (i < e[o]) {
            i = t;
            break;
          }
          t = e[o];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility &&
          e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 1 &&
        ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      !1 === this.shouldClick &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]);
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      !1 === t.cssTransitions
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      !1 === e.cssTransitions
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick blur.slick", "*", function (t) {
          t.stopImmediatePropagation();
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              ((e.focussed = o.is(":focus")), e.autoPlay());
          }, 0);
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (!0 === i.options.centerMode) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : !0 === n.options.centerMode &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          !1 === n.options.vertical
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        return this.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        !1 === e.options.infinite
          ? (i = e.slideCount)
          : ((t = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o = this;
      return (
        (t =
          !0 === o.options.centerMode
            ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
            : 0),
        !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
              if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return (e = n), !1;
            }),
            Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
          : o.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (t) {
              var s = o.indexOf(t);
              i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1,
              }),
                -1 !== s &&
                  i(this).attr({
                    "aria-describedby":
                      "slick-slide-control" + e.instanceUid + s,
                  });
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.$slides.eq(s).attr("tabindex", 0);
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        !0 === i.options.accessibility &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      !0 === e.options.dots &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        !0 === e.options.accessibility &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots &&
          !0 === e.options.pauseOnDotsHover &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility &&
          e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && !0 === e.options.accessibility
          ? e.changeSlide({
              data: { message: !0 === e.options.rtl ? "next" : "previous" },
            })
          : 39 === i.keyCode &&
            !0 === e.options.accessibility &&
            e.changeSlide({
              data: { message: !0 === e.options.rtl ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            r = document.createElement("img");
          (r.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                n.$slider.trigger("lazyLoaded", [n, e, t]);
            });
          }),
            (r.onerror = function () {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                n.$slider.trigger("lazyLoadError", [n, e, t]);
            }),
            (r.src = t);
        });
      }
      var t,
        o,
        s,
        n = this;
      if (
        (!0 === n.options.centerMode
          ? !0 === n.options.infinite
            ? (s =
                (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                n.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                n.currentSlide - (n.options.slidesToShow / 2 + 1)
              )),
              (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((o = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (s = Math.ceil(o + n.options.slidesToShow)),
            !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
        (t = n.$slider.find(".slick-slide").slice(o, s)),
        "anticipated" === n.options.lazyLoad)
      )
        for (
          var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0;
          a < n.options.slidesToScroll;
          a++
        )
          r < 0 && (r = n.slideCount - 1),
            (t = (t = t.add(d.eq(r))).add(d.eq(l))),
            r--,
            l++;
      e(t),
        n.slideCount <= n.options.slidesToShow
          ? e(n.$slider.find(".slick-slide"))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
          ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
          : 0 === n.currentSlide &&
            e(
              n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)
            );
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      t.unslicked ||
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility &&
          (t.initADA(),
          t.options.focusOnChange &&
            i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          ((r = document.createElement("img")).onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        if (
          ((i =
            "boolean" == typeof i
              ? !0 === (e = i)
                ? 0
                : o.slideCount - 1
              : !0 === e
              ? --i
              : i),
          o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
        )
          return !1;
        o.unload(),
          !0 === t
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(i).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      !0 === o.options.rtl && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(s)
          : ((s = {}),
            !1 === o.cssTransitions
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      !1 === i.options.vertical
        ? !0 === i.options.centerMode &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          !0 === i.options.centerMode &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        !1 === i.options.vertical && !1 === i.options.variableWidth
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : !0 === i.options.variableWidth
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      !1 === i.options.variableWidth &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          !0 === t.options.rtl
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : void 0 !== arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === i.options.useCSS && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          !1 !== i.animType &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && !1 !== i.animType);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode)
      ) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          !0 === n.options.infinite &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center");
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite &&
          !1 === s.options.fade &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            !0 === s.options.centerMode
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this;
      i || e.autoPlay(), (e.interrupted = i);
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? t.slideHandler(s, !1, !0)
          : t.slideHandler(s);
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (!0 === a.animating && !0 === a.options.waitForAnimate) ||
          (!0 === a.options.fade && a.currentSlide === i)
        ))
      )
        if (
          (!1 === e && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          !1 === a.options.infinite &&
            !1 === a.options.centerMode &&
            (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else if (
          !1 === a.options.infinite &&
          !0 === a.options.centerMode &&
          (i < 0 || i > a.slideCount - a.options.slidesToScroll)
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else {
          if (
            (a.options.autoplay && clearInterval(a.autoPlayTimer),
            (s =
              o < 0
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                  : a.slideCount + o
                : o >= a.slideCount
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? 0
                  : o - a.slideCount
                : o),
            (a.animating = !0),
            a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
            (n = a.currentSlide),
            (a.currentSlide = s),
            a.setSlideClasses(a.currentSlide),
            a.options.asNavFor &&
              (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <=
                l.options.slidesToShow &&
              l.setSlideClasses(a.currentSlide),
            a.updateDots(),
            a.updateArrows(),
            !0 === a.options.fade)
          )
            return (
              !0 !== t
                ? (a.fadeSlideOut(n),
                  a.fadeSlide(s, function () {
                    a.postSlide(s);
                  }))
                : a.postSlide(s),
              void a.animateHeight()
            );
          !0 !== t
            ? a.animateSlide(d, function () {
                a.postSlide(s);
              })
            : a.postSlide(s);
        }
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o <= 360 && o >= 315
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? !1 === s.options.rtl
            ? "right"
            : "left"
          : !0 === s.options.verticalSwiping
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          !1 === e.options.swipe ||
          ("ontouchend" in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (!0 === l.options.verticalSwiping &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (!1 === l.options.rtl ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              !0 === l.options.verticalSwiping &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              !1 === l.options.infinite &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              !1 === l.options.vertical
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
              !0 !== l.options.fade &&
                !1 !== l.options.touchMove &&
                (!0 === l.animating
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      if (
        ((t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
          t.slideCount <= t.options.slidesToShow)
      )
        return (t.touchObject = {}), !1;
      void 0 !== i.originalEvent &&
        void 0 !== i.originalEvent.touches &&
        (e = i.originalEvent.touches[0]),
        (t.touchObject.startX = t.touchObject.curX =
          void 0 !== e ? e.pageX : i.clientX),
        (t.touchObject.startY = t.touchObject.curY =
          void 0 !== e ? e.pageY : i.clientY),
        (t.dragging = !0);
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      e.$slider.trigger("unslick", [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i = this;
      Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          !i.options.infinite &&
          (i.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          i.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === i.currentSlide
            ? (i.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - i.options.slidesToShow &&
              !1 === i.options.centerMode
            ? (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - 1 &&
              !0 === i.options.centerMode &&
              (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || void 0 === s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          void 0 !== t)
        )
          return t;
      return o;
    });
});

/*!
 * HC-Sticky
 * =========
 * Version: 2.2.1
 * Author: Some Web Media
 * Author URL: http://somewebmedia.com
 * Plugin URL: https://github.com/somewebmedia/hc-sticky
 * Description: Cross-browser plugin that makes any element on your page visible while you scroll
 * License: MIT
 */
!(function (t, e) {
  "use strict";
  if ("object" == typeof module && "object" == typeof module.exports) {
    if (!t.document) throw new Error("HC-Sticky requires a browser to run.");
    module.exports = e(t);
  } else
    "function" == typeof define && define.amd
      ? define("hcSticky", [], e(t))
      : e(t);
})("undefined" != typeof window ? window : this, function (U) {
  "use strict";
  var Y = {
      top: 0,
      bottom: 0,
      bottomEnd: 0,
      innerTop: 0,
      innerSticker: null,
      stickyClass: "sticky",
      stickTo: null,
      followScroll: !0,
      responsive: null,
      mobileFirst: !1,
      onStart: null,
      onStop: null,
      onBeforeResize: null,
      onResize: null,
      resizeDebounce: 100,
      disable: !1,
      queries: null,
      queryFlow: "down",
    },
    $ = function (t, e, o) {
      console.log(
        "%c! HC Sticky:%c " +
          t +
          "%c " +
          o +
          " is now deprecated and will be removed. Use%c " +
          e +
          "%c instead.",
        "color: red",
        "color: darkviolet",
        "color: black",
        "color: darkviolet",
        "color: black"
      );
    },
    Q = U.document,
    X = function (n, f) {
      var o = this;
      if (("string" == typeof n && (n = Q.querySelector(n)), !n)) return !1;
      f.queries && $("queries", "responsive", "option"),
        f.queryFlow && $("queryFlow", "mobileFirst", "option");
      var p = {},
        d = X.Helpers,
        s = n.parentNode;
      "static" === d.getStyle(s, "position") && (s.style.position = "relative");
      var u = function () {
          var t =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
          (d.isEmptyObject(t) && !d.isEmptyObject(p)) ||
            (p = Object.assign({}, Y, p, t));
        },
        t = function () {
          return p.disable;
        },
        e = function () {
          var t,
            e = p.responsive || p.queries;
          if (e) {
            var o = U.innerWidth;
            if (((t = f), (p = Object.assign({}, Y, t || {})).mobileFirst))
              for (var i in e) i <= o && !d.isEmptyObject(e[i]) && u(e[i]);
            else {
              var n = [];
              for (var s in e) {
                var r = {};
                (r[s] = e[s]), n.push(r);
              }
              for (var l = n.length - 1; 0 <= l; l--) {
                var a = n[l],
                  c = Object.keys(a)[0];
                o <= c && !d.isEmptyObject(a[c]) && u(a[c]);
              }
            }
          }
        },
        r = {
          css: {},
          position: null,
          stick: function () {
            var t =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            d.hasClass(n, p.stickyClass) ||
              (!1 === l.isAttached && l.attach(),
              (r.position = "fixed"),
              (n.style.position = "fixed"),
              (n.style.left = l.offsetLeft + "px"),
              (n.style.width = l.width),
              void 0 === t.bottom
                ? (n.style.bottom = "auto")
                : (n.style.bottom = t.bottom + "px"),
              void 0 === t.top
                ? (n.style.top = "auto")
                : (n.style.top = t.top + "px"),
              n.classList
                ? n.classList.add(p.stickyClass)
                : (n.className += " " + p.stickyClass),
              p.onStart && p.onStart.call(n, Object.assign({}, p)));
          },
          release: function () {
            var t =
              0 < arguments.length && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            if (
              ((t.stop = t.stop || !1),
              !0 === t.stop ||
                "fixed" === r.position ||
                null === r.position ||
                !(
                  (void 0 === t.top && void 0 === t.bottom) ||
                  (void 0 !== t.top &&
                    (parseInt(d.getStyle(n, "top")) || 0) === t.top) ||
                  (void 0 !== t.bottom &&
                    (parseInt(d.getStyle(n, "bottom")) || 0) === t.bottom)
                ))
            ) {
              !0 === t.stop
                ? !0 === l.isAttached && l.detach()
                : !1 === l.isAttached && l.attach();
              var e = t.position || r.css.position;
              (r.position = e),
                (n.style.position = e),
                (n.style.left =
                  !0 === t.stop ? r.css.left : l.positionLeft + "px"),
                (n.style.width = "absolute" !== e ? r.css.width : l.width),
                void 0 === t.bottom
                  ? (n.style.bottom = !0 === t.stop ? "" : "auto")
                  : (n.style.bottom = t.bottom + "px"),
                void 0 === t.top
                  ? (n.style.top = !0 === t.stop ? "" : "auto")
                  : (n.style.top = t.top + "px"),
                n.classList
                  ? n.classList.remove(p.stickyClass)
                  : (n.className = n.className.replace(
                      new RegExp(
                        "(^|\\b)" +
                          p.stickyClass.split(" ").join("|") +
                          "(\\b|$)",
                        "gi"
                      ),
                      " "
                    )),
                p.onStop && p.onStop.call(n, Object.assign({}, p));
            }
          },
        },
        l = {
          el: Q.createElement("div"),
          offsetLeft: null,
          positionLeft: null,
          width: null,
          isAttached: !1,
          init: function () {
            for (var t in r.css) l.el.style[t] = r.css[t];
            l.el.style["z-index"] = "-1";
            var e = d.getStyle(n);
            (l.offsetLeft = d.offset(n).left - (parseInt(e.marginLeft) || 0)),
              (l.positionLeft = d.position(n).left),
              (l.width = d.getStyle(n, "width"));
          },
          attach: function () {
            s.insertBefore(l.el, n), (l.isAttached = !0);
          },
          detach: function () {
            (l.el = s.removeChild(l.el)), (l.isAttached = !1);
          },
        },
        a = void 0,
        c = void 0,
        g = void 0,
        m = void 0,
        h = void 0,
        v = void 0,
        y = void 0,
        b = void 0,
        S = void 0,
        w = void 0,
        k = void 0,
        E = void 0,
        x = void 0,
        L = void 0,
        T = void 0,
        j = void 0,
        O = void 0,
        C = void 0,
        i = function () {
          var t, e, o, i;
          (r.css =
            ((t = n),
            (e = d.getCascadedStyle(t)),
            (o = d.getStyle(t)),
            (i = {
              height: t.offsetHeight + "px",
              left: e.left,
              right: e.right,
              top: e.top,
              bottom: e.bottom,
              position: o.position,
              display: o.display,
              verticalAlign: o.verticalAlign,
              boxSizing: o.boxSizing,
              marginLeft: e.marginLeft,
              marginRight: e.marginRight,
              marginTop: e.marginTop,
              marginBottom: e.marginBottom,
              paddingLeft: e.paddingLeft,
              paddingRight: e.paddingRight,
            }),
            e.float && (i.float = e.float || "none"),
            e.cssFloat && (i.cssFloat = e.cssFloat || "none"),
            o.MozBoxSizing && (i.MozBoxSizing = o.MozBoxSizing),
            (i.width =
              "auto" !== e.width
                ? e.width
                : "border-box" === i.boxSizing ||
                  "border-box" === i.MozBoxSizing
                ? t.offsetWidth + "px"
                : o.width),
            i)),
            l.init(),
            (a = !(
              !p.stickTo ||
              !(
                "document" === p.stickTo ||
                (p.stickTo.nodeType && 9 === p.stickTo.nodeType) ||
                ("object" == typeof p.stickTo &&
                  p.stickTo instanceof
                    ("undefined" != typeof HTMLDocument
                      ? HTMLDocument
                      : Document))
              )
            )),
            (c = p.stickTo
              ? a
                ? Q
                : "string" == typeof p.stickTo
                ? Q.querySelector(p.stickTo)
                : p.stickTo
              : s),
            (T = (C = function () {
              var t =
                  n.offsetHeight +
                  (parseInt(r.css.marginTop) || 0) +
                  (parseInt(r.css.marginBottom) || 0),
                e = (T || 0) - t;
              return -1 <= e && e <= 1 ? T : t;
            })()),
            (m = (O = function () {
              return a
                ? Math.max(
                    Q.documentElement.clientHeight,
                    Q.body.scrollHeight,
                    Q.documentElement.scrollHeight,
                    Q.body.offsetHeight,
                    Q.documentElement.offsetHeight
                  )
                : c.offsetHeight;
            })()),
            (h = a ? 0 : d.offset(c).top),
            (v = p.stickTo ? (a ? 0 : d.offset(s).top) : h),
            (y = U.innerHeight),
            (j = n.offsetTop - (parseInt(r.css.marginTop) || 0)),
            (g = p.innerSticker
              ? "string" == typeof p.innerSticker
                ? Q.querySelector(p.innerSticker)
                : p.innerSticker
              : null),
            (b =
              isNaN(p.top) && -1 < p.top.indexOf("%")
                ? (parseFloat(p.top) / 100) * y
                : p.top),
            (S =
              isNaN(p.bottom) && -1 < p.bottom.indexOf("%")
                ? (parseFloat(p.bottom) / 100) * y
                : p.bottom),
            (w = g ? g.offsetTop : p.innerTop ? p.innerTop : 0),
            (k =
              isNaN(p.bottomEnd) && -1 < p.bottomEnd.indexOf("%")
                ? (parseFloat(p.bottomEnd) / 100) * y
                : p.bottomEnd),
            (E = h - b + w + j);
        },
        z = U.pageYOffset || Q.documentElement.scrollTop,
        N = 0,
        H = void 0,
        R = function () {
          (T = C()), (m = O()), (x = h + m - b - k), (L = y < T);
          var t = U.pageYOffset || Q.documentElement.scrollTop,
            e = Math.round(d.offset(n).top),
            o = e - t,
            i = void 0;
          (H = t < z ? "up" : "down"),
            (N = t - z),
            E < (z = t)
              ? x + b + (L ? S : 0) - (p.followScroll && L ? 0 : b) <=
                t +
                  T -
                  w -
                  (y - (E - w) < T - w && p.followScroll && 0 < (i = T - y - w)
                    ? i
                    : 0)
                ? r.release({
                    position: "absolute",
                    bottom: v + s.offsetHeight - x - b,
                  })
                : L && p.followScroll
                ? "down" === H
                  ? Math.floor(o + T + S) <= y
                    ? r.stick({ bottom: S })
                    : "fixed" === r.position &&
                      r.release({
                        position: "absolute",
                        top: e - b - E - N + w,
                      })
                  : Math.ceil(o + w) < 0 && "fixed" === r.position
                  ? r.release({ position: "absolute", top: e - b - E + w - N })
                  : t + b - w <= e && r.stick({ top: b - w })
                : r.stick({ top: b - w })
              : r.release({ stop: !0 });
        },
        A = !1,
        B = !1,
        I = function () {
          A && (d.event.unbind(U, "scroll", R), (A = !1));
        },
        q = function () {
          null !== n.offsetParent && "none" !== d.getStyle(n, "display")
            ? (i(),
              m <= T
                ? I()
                : (R(), A || (d.event.bind(U, "scroll", R), (A = !0))))
            : I();
        },
        F = function () {
          (n.style.position = ""),
            (n.style.left = ""),
            (n.style.top = ""),
            (n.style.bottom = ""),
            (n.style.width = ""),
            n.classList
              ? n.classList.remove(p.stickyClass)
              : (n.className = n.className.replace(
                  new RegExp(
                    "(^|\\b)" + p.stickyClass.split(" ").join("|") + "(\\b|$)",
                    "gi"
                  ),
                  " "
                )),
            (r.css = {}),
            !(r.position = null) === l.isAttached && l.detach();
        },
        M = function () {
          F(), e(), t() ? I() : q();
        },
        D = function () {
          p.onBeforeResize && p.onBeforeResize.call(n, Object.assign({}, p)),
            M(),
            p.onResize && p.onResize.call(n, Object.assign({}, p));
        },
        P = p.resizeDebounce ? d.debounce(D, p.resizeDebounce) : D,
        W = function () {
          B && (d.event.unbind(U, "resize", P), (B = !1)), I();
        },
        V = function () {
          B || (d.event.bind(U, "resize", P), (B = !0)), e(), t() ? I() : q();
        };
      (this.options = function (t) {
        return t ? p[t] : Object.assign({}, p);
      }),
        (this.refresh = M),
        (this.update = function (t) {
          u(t), (f = Object.assign({}, f, t || {})), M();
        }),
        (this.attach = V),
        (this.detach = W),
        (this.destroy = function () {
          W(), F();
        }),
        (this.triggerMethod = function (t, e) {
          "function" == typeof o[t] && o[t](e);
        }),
        (this.reinit = function () {
          $("reinit", "refresh", "method"), M();
        }),
        u(f),
        V(),
        d.event.bind(U, "load", M);
    };
  if (void 0 !== U.jQuery) {
    var i = U.jQuery,
      n = "hcSticky";
    i.fn.extend({
      hcSticky: function (e, o) {
        return this.length
          ? "options" === e
            ? i.data(this.get(0), n).options()
            : this.each(function () {
                var t = i.data(this, n);
                t
                  ? t.triggerMethod(e, o)
                  : ((t = new X(this, e)), i.data(this, n, t));
              })
          : this;
      },
    });
  }
  return (U.hcSticky = U.hcSticky || X), X;
}),
  (function (c) {
    "use strict";
    var t = c.hcSticky,
      f = c.document;
    "function" != typeof Object.assign &&
      Object.defineProperty(Object, "assign", {
        value: function (t, e) {
          if (null == t)
            throw new TypeError("Cannot convert undefined or null to object");
          for (var o = Object(t), i = 1; i < arguments.length; i++) {
            var n = arguments[i];
            if (null != n)
              for (var s in n)
                Object.prototype.hasOwnProperty.call(n, s) && (o[s] = n[s]);
          }
          return o;
        },
        writable: !0,
        configurable: !0,
      }),
      Array.prototype.forEach ||
        (Array.prototype.forEach = function (t) {
          var e, o;
          if (null == this) throw new TypeError("this is null or not defined");
          var i = Object(this),
            n = i.length >>> 0;
          if ("function" != typeof t)
            throw new TypeError(t + " is not a function");
          for (1 < arguments.length && (e = arguments[1]), o = 0; o < n; ) {
            var s;
            o in i && ((s = i[o]), t.call(e, s, o, i)), o++;
          }
        });
    var e = (function () {
        var t = f.documentElement,
          e = function () {};
        function i(t) {
          var e = c.event;
          return (e.target = e.target || e.srcElement || t), e;
        }
        t.addEventListener
          ? (e = function (t, e, o) {
              t.addEventListener(e, o, !1);
            })
          : t.attachEvent &&
            (e = function (e, t, o) {
              (e[t + o] = o.handleEvent
                ? function () {
                    var t = i(e);
                    o.handleEvent.call(o, t);
                  }
                : function () {
                    var t = i(e);
                    o.call(e, t);
                  }),
                e.attachEvent("on" + t, e[t + o]);
            });
        var o = function () {};
        return (
          t.removeEventListener
            ? (o = function (t, e, o) {
                t.removeEventListener(e, o, !1);
              })
            : t.detachEvent &&
              (o = function (e, o, i) {
                e.detachEvent("on" + o, e[o + i]);
                try {
                  delete e[o + i];
                } catch (t) {
                  e[o + i] = void 0;
                }
              }),
          { bind: e, unbind: o }
        );
      })(),
      r = function (t, e) {
        return c.getComputedStyle
          ? e
            ? f.defaultView.getComputedStyle(t, null).getPropertyValue(e)
            : f.defaultView.getComputedStyle(t, null)
          : t.currentStyle
          ? e
            ? t.currentStyle[
                e.replace(/-\w/g, function (t) {
                  return t.toUpperCase().replace("-", "");
                })
              ]
            : t.currentStyle
          : void 0;
      },
      l = function (t) {
        var e = t.getBoundingClientRect(),
          o = c.pageYOffset || f.documentElement.scrollTop,
          i = c.pageXOffset || f.documentElement.scrollLeft;
        return { top: e.top + o, left: e.left + i };
      };
    t.Helpers = {
      isEmptyObject: function (t) {
        for (var e in t) return !1;
        return !0;
      },
      debounce: function (i, n, s) {
        var r = void 0;
        return function () {
          var t = this,
            e = arguments,
            o = s && !r;
          clearTimeout(r),
            (r = setTimeout(function () {
              (r = null), s || i.apply(t, e);
            }, n)),
            o && i.apply(t, e);
        };
      },
      hasClass: function (t, e) {
        return t.classList
          ? t.classList.contains(e)
          : new RegExp("(^| )" + e + "( |$)", "gi").test(t.className);
      },
      offset: l,
      position: function (t) {
        var e = t.offsetParent,
          o = l(e),
          i = l(t),
          n = r(e),
          s = r(t);
        return (
          (o.top += parseInt(n.borderTopWidth) || 0),
          (o.left += parseInt(n.borderLeftWidth) || 0),
          {
            top: i.top - o.top - (parseInt(s.marginTop) || 0),
            left: i.left - o.left - (parseInt(s.marginLeft) || 0),
          }
        );
      },
      getStyle: r,
      getCascadedStyle: function (t) {
        var e = t.cloneNode(!0);
        (e.style.display = "none"),
          Array.prototype.slice
            .call(e.querySelectorAll('input[type="radio"]'))
            .forEach(function (t) {
              t.removeAttribute("name");
            }),
          t.parentNode.insertBefore(e, t.nextSibling);
        var o = void 0;
        e.currentStyle
          ? (o = e.currentStyle)
          : c.getComputedStyle && (o = f.defaultView.getComputedStyle(e, null));
        var i = {};
        for (var n in o)
          !isNaN(n) ||
            ("string" != typeof o[n] && "number" != typeof o[n]) ||
            (i[n] = o[n]);
        if (Object.keys(i).length < 3)
          for (var s in ((i = {}), o))
            isNaN(s) ||
              (i[
                o[s].replace(/-\w/g, function (t) {
                  return t.toUpperCase().replace("-", "");
                })
              ] = o.getPropertyValue(o[s]));
        if (
          (i.margin || "auto" !== i.marginLeft
            ? i.margin ||
              i.marginLeft !== i.marginRight ||
              i.marginLeft !== i.marginTop ||
              i.marginLeft !== i.marginBottom ||
              (i.margin = i.marginLeft)
            : (i.margin = "auto"),
          !i.margin && "0px" === i.marginLeft && "0px" === i.marginRight)
        ) {
          var r = t.offsetLeft - t.parentNode.offsetLeft,
            l = r - (parseInt(i.left) || 0) - (parseInt(i.right) || 0),
            a =
              t.parentNode.offsetWidth -
              t.offsetWidth -
              r -
              (parseInt(i.right) || 0) +
              (parseInt(i.left) || 0) -
              l;
          (0 !== a && 1 !== a) || (i.margin = "auto");
        }
        return e.parentNode.removeChild(e), (e = null), i;
      },
      event: e,
    };
  })(window);

/** Scroll Spy  */
const links = document.querySelectorAll(".scrollspy-link a");
const sections = document.querySelectorAll(".scrollspy-section");
const indicator = document.querySelector(".scrollspy-indicator");
/*
links.forEach((link) => {
  link.onclick = () => {
    sections.forEach((section) => {
      if (link.dataset.target === section.id) {
        document.documentElement.scrollTop = section.offsetTop;
      }
    });
  };
});*/

window.onscroll = () => scrollspy();
window.onload = () => scrollspy();
window.onresize = () => scrollspy();

const scrollspy = () => {
  const pageYPosition =
    document.documentElement.scrollTop || document.body.scrollTop;
  sections.forEach((section) => {
    const sectionYPosition = section.offsetTop;

    if (pageYPosition > sectionYPosition - 160 - 150) {
      links.forEach((link) => {
        if (link.dataset.target === section.id) {
          indicator.style.left = `${
            link.closest(".scrollspy-link").offsetLeft
          }px`;
          indicator.style.width = `${
            link.closest(".scrollspy-link").offsetWidth
          }px`;
        }
      });
    }
  });
};

scrollspy();

/* menu on scroll */
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $("#header.fixed").outerHeight();
var didScroll;

$(window).scroll(function (event) {
  didScroll = true;
});

setInterval(function () {
  if (didScroll) {
    lastScrollTop = hasScrolled(lastScrollTop);
    didScroll = false;
  }
}, 250);

function hasScrolled(lastScrollTop = 0) {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $("#header.fixed").removeClass("nav-down").addClass("nav-up");
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $("#header.fixed").removeClass("nav-up").addClass("nav-down");
    }
  }

  lastScrollTop = st;
  return lastScrollTop;
}

/* Chocolat-1.0.4 */
/* jQuery plugin for lightbox */
!(function () {
  "use strict";
  let e = void 0;
  function t(e, t) {
    return new Promise((s) => {
      const i = () => {
        t.removeEventListener("transitionend", i), s();
      };
      t.addEventListener("transitionend", i);
      const l = t.getAttribute("class"),
        n = t.getAttribute("style");
      e(),
        l === t.getAttribute("class") && n === t.getAttribute("style") && i(),
        0 === parseFloat(getComputedStyle(t).transitionDuration) && i();
    });
  }
  function s({ src: e, srcset: t, sizes: s }) {
    const i = new Image();
    return (
      (i.src = e),
      t && (i.srcset = t),
      s && (i.sizes = s),
      "decode" in i
        ? new Promise((e, t) => {
            i.decode()
              .then(() => {
                e(i);
              })
              .catch(() => {
                t(i);
              });
          })
        : new Promise((e, t) => {
            (i.onload = e(i)), (i.onerror = t(i));
          })
    );
  }
  function i(e) {
    let t, s;
    const {
        imgHeight: i,
        imgWidth: l,
        containerHeight: n,
        containerWidth: a,
        canvasWidth: o,
        canvasHeight: c,
        imageSize: h,
      } = e,
      r = i / l;
    return (
      "cover" == h
        ? r < n / a
          ? (s = (t = n) / r)
          : (t = (s = a) * r)
        : "native" == h
        ? ((t = i), (s = l))
        : (r > c / o ? (s = (t = c) / r) : (t = (s = o) * r),
          "scale-down" === h && (s >= l || t >= i) && ((s = l), (t = i))),
      { height: t, width: s }
    );
  }
  function l(e) {
    return e.requestFullscreen
      ? e.requestFullscreen()
      : e.webkitRequestFullscreen
      ? e.webkitRequestFullscreen()
      : e.msRequestFullscreen
      ? e.msRequestFullscreen()
      : Promise.reject();
  }
  function n() {
    return document.exitFullscreen
      ? document.exitFullscreen()
      : document.webkitExitFullscreen
      ? document.webkitExitFullscreen()
      : document.msExitFullscreen
      ? document.msExitFullscreen()
      : Promise.reject();
  }
  const a = {
    container: document.body,
    className: void 0,
    imageSize: "scale-down",
    fullScreen: !1,
    loop: !1,
    linkImages: !0,
    setIndex: 0,
    firstImageIndex: 0,
    lastImageIndex: !1,
    currentImageIndex: void 0,
    allowZoom: !0,
    closeOnBackgroundClick: !0,
    setTitle: function () {
      return "";
    },
    description: function () {
      return this.images[this.settings.currentImageIndex].title;
    },
    pagination: function () {
      const e = this.settings.lastImageIndex + 1;
      return this.settings.currentImageIndex + 1 + "/" + e;
    },
    afterInitialize() {},
    afterMarkup() {},
    afterImageLoad() {},
    afterClose() {},
    zoomedPaddingX: function (e, t) {
      return 0;
    },
    zoomedPaddingY: function (e, t) {
      return 0;
    },
  };
  class o {
    constructor(e, t) {
      (this.settings = t),
        (this.elems = {}),
        (this.images = []),
        (this.events = []),
        (this.state = {
          fullScreenOpen: !1,
          initialZoomState: null,
          initialized: !1,
          timer: !1,
          visible: !1,
        }),
        (this._cssClasses = [
          "chocolat-open",
          "chocolat-in-container",
          "chocolat-cover",
          "chocolat-zoomable",
          "chocolat-zoomed",
          "chocolat-zooming-in",
          "chocolat-zooming-out",
        ]),
        NodeList.prototype.isPrototypeOf(e) ||
        HTMLCollection.prototype.isPrototypeOf(e)
          ? e.forEach((e, t) => {
              this.images.push({
                title: e.getAttribute("title"),
                src: e.getAttribute("href"),
                srcset: e.getAttribute("data-srcset"),
                sizes: e.getAttribute("data-sizes"),
              }),
                this.off(e, "click.chocolat"),
                this.on(e, "click.chocolat", (e) => {
                  this.init(t), e.preventDefault();
                });
            })
          : (this.images = e),
        this.settings.container instanceof Element ||
        this.settings.container instanceof HTMLElement
          ? (this.elems.container = this.settings.container)
          : (this.elems.container = document.body),
        (this.api = {
          open: (e) => ((e = parseInt(e) || 0), this.init(e)),
          close: () => this.close(),
          next: () => this.change(1),
          prev: () => this.change(-1),
          goto: (e) => this.open(e),
          current: () => this.settings.currentImageIndex,
          position: () => this.position(this.elems.img),
          destroy: () => this.destroy(),
          set: (e, t) => ((this.settings[e] = t), t),
          get: (e) => this.settings[e],
          getElem: (e) => this.elems[e],
        });
    }
    init(e) {
      return (
        this.state.initialized ||
          (this.markup(),
          this.attachListeners(),
          (this.settings.lastImageIndex = this.images.length - 1),
          (this.state.initialized = !0)),
        this.settings.afterInitialize.call(this),
        this.load(e)
      );
    }
    load(e) {
      if (
        (this.state.visible ||
          ((this.state.visible = !0),
          setTimeout(() => {
            this.elems.overlay.classList.add("chocolat-visible"),
              this.elems.wrapper.classList.add("chocolat-visible");
          }, 0),
          this.elems.container.classList.add("chocolat-open")),
        this.settings.fullScreen && l(this.elems.wrapper),
        this.settings.currentImageIndex === e)
      )
        return Promise.resolve();
      let i,
        n,
        a = setTimeout(() => {
          this.elems.loader.classList.add("chocolat-visible");
        }, 1e3),
        o = setTimeout(() => {
          (o = void 0),
            (i = t(() => {
              this.elems.imageCanvas.classList.remove("chocolat-visible");
            }, this.elems.imageCanvas));
        }, 80);
      return s(this.images[e])
        .then((e) => ((n = e), o ? (clearTimeout(o), Promise.resolve()) : i))
        .then(() => {
          const t = e + 1;
          return (
            null != this.images[t] && s(this.images[t]),
            (this.settings.currentImageIndex = e),
            (this.elems.description.textContent =
              this.settings.description.call(this)),
            (this.elems.pagination.textContent =
              this.settings.pagination.call(this)),
            this.arrows(),
            this.position(n).then(
              () => (
                this.elems.loader.classList.remove("chocolat-visible"),
                clearTimeout(a),
                this.appear(n)
              )
            )
          );
        })
        .then(() => {
          this.elems.container.classList.toggle(
            "chocolat-zoomable",
            this.zoomable(n, this.elems.wrapper)
          ),
            this.settings.afterImageLoad.call(this);
        });
    }
    position({ naturalHeight: e, naturalWidth: s }) {
      const l = {
          imgHeight: e,
          imgWidth: s,
          containerHeight: this.elems.container.clientHeight,
          containerWidth: this.elems.container.clientWidth,
          canvasWidth: this.elems.imageCanvas.clientWidth,
          canvasHeight: this.elems.imageCanvas.clientHeight,
          imageSize: this.settings.imageSize,
        },
        { width: n, height: a } = i(l);
      return t(() => {
        Object.assign(this.elems.imageWrapper.style, {
          width: n + "px",
          height: a + "px",
        });
      }, this.elems.imageWrapper);
    }
    appear(e) {
      return (
        this.elems.imageWrapper.removeChild(this.elems.img),
        (this.elems.img = e),
        this.elems.img.setAttribute("class", "chocolat-img"),
        this.elems.imageWrapper.appendChild(this.elems.img),
        t(() => {
          this.elems.imageCanvas.classList.add("chocolat-visible");
        }, this.elems.imageCanvas)
      );
    }
    change(e) {
      if (!this.state.visible) return;
      if (!this.settings.linkImages) return;
      this.zoomOut();
      const t = this.settings.currentImageIndex + parseInt(e);
      if (t > this.settings.lastImageIndex) {
        if (this.settings.loop) return this.load(this.settings.firstImageIndex);
      } else {
        if (!(t < this.settings.firstImageIndex)) return this.load(t);
        if (this.settings.loop) return this.load(this.settings.lastImageIndex);
      }
    }
    arrows() {
      this.settings.loop
        ? (this.elems.left.classList.add("active"),
          this.elems.right.classList.add("active"))
        : this.settings.linkImages
        ? (this.elems.right.classList.toggle(
            "active",
            this.settings.currentImageIndex !== this.settings.lastImageIndex
          ),
          this.elems.left.classList.toggle(
            "active",
            this.settings.currentImageIndex !== this.settings.firstImageIndex
          ))
        : (this.elems.left.classList.remove("active"),
          this.elems.right.classList.remove("active"));
    }
    close() {
      if (this.state.fullScreenOpen) return void n();
      this.state.visible = !1;
      const e = t(() => {
          this.elems.overlay.classList.remove("chocolat-visible");
        }, this.elems.overlay),
        s = t(() => {
          this.elems.wrapper.classList.remove("chocolat-visible");
        }, this.elems.wrapper);
      return Promise.all([e, s]).then(() => {
        this.elems.container.classList.remove("chocolat-open"),
          this.settings.afterClose.call(this);
      });
    }
    destroy() {
      for (let e = this.events.length - 1; e >= 0; e--) {
        const { element: t, eventName: s } = this.events[e];
        this.off(t, s);
      }
      this.state.initialized &&
        (this.state.fullScreenOpen && n(),
        (this.settings.currentImageIndex = void 0),
        (this.state.visible = !1),
        (this.state.initialized = !1),
        this.elems.container.classList.remove(...this._cssClasses),
        this.elems.wrapper.parentNode.removeChild(this.elems.wrapper));
    }
    markup() {
      this.elems.container.classList.add(
        "chocolat-open",
        this.settings.className
      ),
        "cover" == this.settings.imageSize &&
          this.elems.container.classList.add("chocolat-cover"),
        this.elems.container !== document.body &&
          this.elems.container.classList.add("chocolat-in-container"),
        (this.elems.wrapper = document.createElement("div")),
        this.elems.wrapper.setAttribute(
          "id",
          "chocolat-content-" + this.settings.setIndex
        ),
        this.elems.wrapper.setAttribute("class", "chocolat-wrapper"),
        this.elems.container.appendChild(this.elems.wrapper),
        (this.elems.overlay = document.createElement("div")),
        this.elems.overlay.setAttribute("class", "chocolat-overlay"),
        this.elems.wrapper.appendChild(this.elems.overlay),
        (this.elems.loader = document.createElement("div")),
        this.elems.loader.setAttribute("class", "chocolat-loader"),
        this.elems.wrapper.appendChild(this.elems.loader),
        (this.elems.layout = document.createElement("div")),
        this.elems.layout.setAttribute("class", "chocolat-layout"),
        this.elems.wrapper.appendChild(this.elems.layout),
        (this.elems.top = document.createElement("div")),
        this.elems.top.setAttribute("class", "chocolat-top"),
        this.elems.layout.appendChild(this.elems.top),
        (this.elems.center = document.createElement("div")),
        this.elems.center.setAttribute("class", "chocolat-center"),
        this.elems.layout.appendChild(this.elems.center),
        (this.elems.left = document.createElement("div")),
        this.elems.left.setAttribute("class", "chocolat-left"),
        this.elems.center.appendChild(this.elems.left),
        (this.elems.imageCanvas = document.createElement("div")),
        this.elems.imageCanvas.setAttribute("class", "chocolat-image-canvas"),
        this.elems.center.appendChild(this.elems.imageCanvas),
        (this.elems.imageWrapper = document.createElement("div")),
        this.elems.imageWrapper.setAttribute("class", "chocolat-image-wrapper"),
        this.elems.imageCanvas.appendChild(this.elems.imageWrapper),
        (this.elems.img = document.createElement("img")),
        this.elems.img.setAttribute("class", "chocolat-img"),
        this.elems.imageWrapper.appendChild(this.elems.img),
        (this.elems.right = document.createElement("div")),
        this.elems.right.setAttribute("class", "chocolat-right"),
        this.elems.center.appendChild(this.elems.right),
        (this.elems.bottom = document.createElement("div")),
        this.elems.bottom.setAttribute("class", "chocolat-bottom"),
        this.elems.layout.appendChild(this.elems.bottom),
        (this.elems.close = document.createElement("span")),
        this.elems.close.setAttribute("class", "chocolat-close"),
        this.elems.top.appendChild(this.elems.close),
        (this.elems.description = document.createElement("span")),
        this.elems.description.setAttribute("class", "chocolat-description"),
        this.elems.bottom.appendChild(this.elems.description),
        (this.elems.pagination = document.createElement("span")),
        this.elems.pagination.setAttribute("class", "chocolat-pagination"),
        this.elems.bottom.appendChild(this.elems.pagination),
        (this.elems.setTitle = document.createElement("span")),
        this.elems.setTitle.setAttribute("class", "chocolat-set-title"),
        (this.elems.setTitle.textContent = this.settings.setTitle()),
        this.elems.bottom.appendChild(this.elems.setTitle),
        (this.elems.fullscreen = document.createElement("span")),
        this.elems.fullscreen.setAttribute("class", "chocolat-fullscreen"),
        this.elems.bottom.appendChild(this.elems.fullscreen),
        this.settings.afterMarkup.call(this);
    }
    attachListeners() {
      this.off(document, "keydown.chocolat"),
        this.on(document, "keydown.chocolat", (e) => {
          this.state.initialized &&
            (37 == e.keyCode
              ? this.change(-1)
              : 39 == e.keyCode
              ? this.change(1)
              : 27 == e.keyCode && this.close());
        });
      const t = this.elems.wrapper.querySelector(".chocolat-right");
      this.off(t, "click.chocolat"),
        this.on(t, "click.chocolat", () => {
          this.change(1);
        });
      const s = this.elems.wrapper.querySelector(".chocolat-left");
      this.off(s, "click.chocolat"),
        this.on(s, "click.chocolat", () => {
          this.change(-1);
        }),
        this.off(this.elems.close, "click.chocolat"),
        this.on(this.elems.close, "click.chocolat", this.close.bind(this)),
        this.off(this.elems.fullscreen, "click.chocolat"),
        this.on(this.elems.fullscreen, "click.chocolat", () => {
          this.state.fullScreenOpen ? n() : l(this.elems.wrapper);
        }),
        this.off(document, "fullscreenchange.chocolat"),
        this.on(document, "fullscreenchange.chocolat", () => {
          document.fullscreenElement ||
          document.webkitCurrentFullScreenElement ||
          document.webkitFullscreenElement
            ? (this.state.fullScreenOpen = !0)
            : (this.state.fullScreenOpen = !1);
        }),
        this.off(document, "webkitfullscreenchange.chocolat"),
        this.on(document, "webkitfullscreenchange.chocolat", () => {
          document.fullscreenElement ||
          document.webkitCurrentFullScreenElement ||
          document.webkitFullscreenElement
            ? (this.state.fullScreenOpen = !0)
            : (this.state.fullScreenOpen = !1);
        }),
        this.settings.closeOnBackgroundClick &&
          (this.off(this.elems.overlay, "click.chocolat"),
          this.on(this.elems.overlay, "click.chocolat", this.close.bind(this))),
        this.off(this.elems.wrapper, "click.chocolat"),
        this.on(this.elems.wrapper, "click.chocolat", () => {
          null !== this.state.initialZoomState &&
            this.state.visible &&
            (this.elems.container.classList.add("chocolat-zooming-out"),
            this.zoomOut().then(() => {
              this.elems.container.classList.remove("chocolat-zoomed"),
                this.elems.container.classList.remove("chocolat-zooming-out");
            }));
        }),
        this.off(this.elems.imageWrapper, "click.chocolat"),
        this.on(this.elems.imageWrapper, "click.chocolat", (e) => {
          null === this.state.initialZoomState &&
            this.elems.container.classList.contains("chocolat-zoomable") &&
            (e.stopPropagation(),
            this.elems.container.classList.add("chocolat-zooming-in"),
            this.zoomIn(e).then(() => {
              this.elems.container.classList.add("chocolat-zoomed"),
                this.elems.container.classList.remove("chocolat-zooming-in");
            }));
        }),
        this.on(this.elems.wrapper, "mousemove.chocolat", (e) => {
          if (null === this.state.initialZoomState || !this.state.visible)
            return;
          const t = this.elems.wrapper.getBoundingClientRect(),
            s = t.top + window.scrollY,
            i = t.left + window.scrollX,
            l = this.elems.wrapper.clientHeight,
            n = this.elems.wrapper.clientWidth,
            a = this.elems.img.width,
            o = this.elems.img.height,
            c = [e.pageX - n / 2 - i, e.pageY - l / 2 - s];
          let h = 0;
          if (a > n) {
            const e = this.settings.zoomedPaddingX(a, n);
            (h = c[0] / (n / 2)), (h *= (a - n) / 2 + e);
          }
          let r = 0;
          if (o > l) {
            const e = this.settings.zoomedPaddingY(o, l);
            (r = c[1] / (l / 2)), (r *= (o - l) / 2 + e);
          }
          (this.elems.img.style.marginLeft = -h + "px"),
            (this.elems.img.style.marginTop = -r + "px");
        }),
        this.on(window, "resize.chocolat", (t) => {
          this.state.initialized &&
            this.state.visible &&
            (function (t, s) {
              clearTimeout(e),
                (e = setTimeout(function () {
                  s();
                }, t));
            })(50, () => {
              const e = {
                  imgHeight: this.elems.img.naturalHeight,
                  imgWidth: this.elems.img.naturalWidth,
                  containerHeight: this.elems.wrapper.clientHeight,
                  containerWidth: this.elems.wrapper.clientWidth,
                  canvasWidth: this.elems.imageCanvas.clientWidth,
                  canvasHeight: this.elems.imageCanvas.clientHeight,
                  imageSize: this.settings.imageSize,
                },
                { width: t, height: s } = i(e);
              this.position(this.elems.img).then(() => {
                this.elems.container.classList.toggle(
                  "chocolat-zoomable",
                  this.zoomable(this.elems.img, this.elems.wrapper)
                );
              });
            });
        });
    }
    zoomable(e, t) {
      const s = t.clientWidth,
        i = t.clientHeight,
        l = !(
          !this.settings.allowZoom ||
          !(e.naturalWidth > s || e.naturalHeight > i)
        ),
        n = e.clientWidth > e.naturalWidth || e.clientHeight > e.naturalHeight;
      return l && !n;
    }
    zoomIn(e) {
      return (
        (this.state.initialZoomState = this.settings.imageSize),
        (this.settings.imageSize = "native"),
        this.position(this.elems.img)
      );
    }
    zoomOut(e) {
      return (
        (this.settings.imageSize =
          this.state.initialZoomState || this.settings.imageSize),
        (this.state.initialZoomState = null),
        (this.elems.img.style.margin = 0),
        this.position(this.elems.img)
      );
    }
    on(e, t, s) {
      const i = this.events.push({ element: e, eventName: t, cb: s });
      e.addEventListener(t.split(".")[0], this.events[i - 1].cb);
    }
    off(e, t) {
      const s = this.events.findIndex(
        (s) => s.element === e && s.eventName === t
      );
      this.events[s] &&
        (e.removeEventListener(t.split(".")[0], this.events[s].cb),
        this.events.splice(s, 1));
    }
  }
  const c = [];
  window.Chocolat = function (e, t) {
    const s = Object.assign({}, a, { images: [] }, t, { setIndex: c.length }),
      i = new o(e, s);
    return c.push(i), i;
  };
})();

/*
 anime.js
 2017 Julian Garnier
 Released under the MIT license
*/
var $jscomp$this = this;
(function (v, p) {
  "function" === typeof define && define.amd
    ? define([], p)
    : "object" === typeof module && module.exports
    ? (module.exports = p())
    : (v.anime = p());
})(this, function () {
  function v(a) {
    if (!g.col(a))
      try {
        return document.querySelectorAll(a);
      } catch (b) {}
  }
  function p(a) {
    return a.reduce(function (a, d) {
      return a.concat(g.arr(d) ? p(d) : d);
    }, []);
  }
  function w(a) {
    if (g.arr(a)) return a;
    g.str(a) && (a = v(a) || a);
    return a instanceof NodeList || a instanceof HTMLCollection
      ? [].slice.call(a)
      : [a];
  }
  function F(a, b) {
    return a.some(function (a) {
      return a === b;
    });
  }
  function A(a) {
    var b = {},
      d;
    for (d in a) b[d] = a[d];
    return b;
  }
  function G(a, b) {
    var d = A(a),
      c;
    for (c in a) d[c] = b.hasOwnProperty(c) ? b[c] : a[c];
    return d;
  }
  function B(a, b) {
    var d = A(a),
      c;
    for (c in b) d[c] = g.und(a[c]) ? b[c] : a[c];
    return d;
  }
  function S(a) {
    a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (a, b, d, h) {
      return b + b + d + d + h + h;
    });
    var b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
    a = parseInt(b[1], 16);
    var d = parseInt(b[2], 16),
      b = parseInt(b[3], 16);
    return "rgb(" + a + "," + d + "," + b + ")";
  }
  function T(a) {
    function b(a, b, c) {
      0 > c && (c += 1);
      1 < c && --c;
      return c < 1 / 6
        ? a + 6 * (b - a) * c
        : 0.5 > c
        ? b
        : c < 2 / 3
        ? a + (b - a) * (2 / 3 - c) * 6
        : a;
    }
    var d = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(a);
    a = parseInt(d[1]) / 360;
    var c = parseInt(d[2]) / 100,
      d = parseInt(d[3]) / 100;
    if (0 == c) c = d = a = d;
    else {
      var e = 0.5 > d ? d * (1 + c) : d + c - d * c,
        l = 2 * d - e,
        c = b(l, e, a + 1 / 3),
        d = b(l, e, a);
      a = b(l, e, a - 1 / 3);
    }
    return "rgb(" + 255 * c + "," + 255 * d + "," + 255 * a + ")";
  }
  function x(a) {
    if (
      (a =
        /([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg|rad|turn)?/.exec(
          a
        ))
    )
      return a[2];
  }
  function U(a) {
    if (-1 < a.indexOf("translate")) return "px";
    if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) return "deg";
  }
  function H(a, b) {
    return g.fnc(a) ? a(b.target, b.id, b.total) : a;
  }
  function C(a, b) {
    if (b in a.style)
      return (
        getComputedStyle(a).getPropertyValue(
          b.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
        ) || "0"
      );
  }
  function I(a, b) {
    if (g.dom(a) && F(V, b)) return "transform";
    if (g.dom(a) && (a.getAttribute(b) || (g.svg(a) && a[b])))
      return "attribute";
    if (g.dom(a) && "transform" !== b && C(a, b)) return "css";
    if (null != a[b]) return "object";
  }
  function W(a, b) {
    var d = U(b),
      d = -1 < b.indexOf("scale") ? 1 : 0 + d;
    a = a.style.transform;
    if (!a) return d;
    for (var c = [], e = [], l = [], h = /(\w+)\((.+?)\)/g; (c = h.exec(a)); )
      e.push(c[1]), l.push(c[2]);
    a = l.filter(function (a, c) {
      return e[c] === b;
    });
    return a.length ? a[0] : d;
  }
  function J(a, b) {
    switch (I(a, b)) {
      case "transform":
        return W(a, b);
      case "css":
        return C(a, b);
      case "attribute":
        return a.getAttribute(b);
    }
    return a[b] || 0;
  }
  function K(a, b) {
    var d = /^(\*=|\+=|-=)/.exec(a);
    if (!d) return a;
    b = parseFloat(b);
    a = parseFloat(a.replace(d[0], ""));
    switch (d[0][0]) {
      case "+":
        return b + a;
      case "-":
        return b - a;
      case "*":
        return b * a;
    }
  }
  function D(a) {
    return g.obj(a) && a.hasOwnProperty("totalLength");
  }
  function X(a, b) {
    function d(c) {
      c = void 0 === c ? 0 : c;
      return a.el.getPointAtLength(1 <= b + c ? b + c : 0);
    }
    var c = d(),
      e = d(-1),
      l = d(1);
    switch (a.property) {
      case "x":
        return c.x;
      case "y":
        return c.y;
      case "angle":
        return (180 * Math.atan2(l.y - e.y, l.x - e.x)) / Math.PI;
    }
  }
  function L(a, b) {
    var d = /-?\d*\.?\d+/g;
    a = D(a) ? a.totalLength : a;
    if (g.col(a)) b = g.rgb(a) ? a : g.hex(a) ? S(a) : g.hsl(a) ? T(a) : void 0;
    else {
      var c = x(a);
      a = c ? a.substr(0, a.length - c.length) : a;
      b = b ? a + b : a;
    }
    b += "";
    return {
      original: b,
      numbers: b.match(d) ? b.match(d).map(Number) : [0],
      strings: b.split(d),
    };
  }
  function Y(a, b) {
    return b.reduce(function (b, c, e) {
      return b + a[e - 1] + c;
    });
  }
  function M(a) {
    return (a ? p(g.arr(a) ? a.map(w) : w(a)) : []).filter(function (a, d, c) {
      return c.indexOf(a) === d;
    });
  }
  function Z(a) {
    var b = M(a);
    return b.map(function (a, c) {
      return { target: a, id: c, total: b.length };
    });
  }
  function aa(a, b) {
    var d = A(b);
    if (g.arr(a)) {
      var c = a.length;
      2 !== c || g.obj(a[0])
        ? g.fnc(b.duration) || (d.duration = b.duration / c)
        : (a = { value: a });
    }
    return w(a)
      .map(function (a, c) {
        c = c ? 0 : b.delay;
        a = g.obj(a) && !D(a) ? a : { value: a };
        g.und(a.delay) && (a.delay = c);
        return a;
      })
      .map(function (a) {
        return B(a, d);
      });
  }
  function ba(a, b) {
    var d = {},
      c;
    for (c in a) {
      var e = H(a[c], b);
      g.arr(e) &&
        ((e = e.map(function (a) {
          return H(a, b);
        })),
        1 === e.length && (e = e[0]));
      d[c] = e;
    }
    d.duration = parseFloat(d.duration);
    d.delay = parseFloat(d.delay);
    return d;
  }
  function ca(a) {
    return g.arr(a) ? y.apply(this, a) : N[a];
  }
  function da(a, b) {
    var d;
    return a.tweens.map(function (c) {
      c = ba(c, b);
      var e = c.value,
        l = J(b.target, a.name),
        h = d ? d.to.original : l,
        h = g.arr(e) ? e[0] : h,
        m = K(g.arr(e) ? e[1] : e, h),
        l = x(m) || x(h) || x(l);
      c.isPath = D(e);
      c.from = L(h, l);
      c.to = L(m, l);
      c.start = d ? d.end : a.offset;
      c.end = c.start + c.delay + c.duration;
      c.easing = ca(c.easing);
      c.elasticity = (1e3 - Math.min(Math.max(c.elasticity, 1), 999)) / 1e3;
      g.col(c.from.original) && (c.round = 1);
      return (d = c);
    });
  }
  function ea(a, b) {
    return p(
      a.map(function (a) {
        return b.map(function (b) {
          var c = I(a.target, b.name);
          if (c) {
            var d = da(b, a);
            b = {
              type: c,
              property: b.name,
              animatable: a,
              tweens: d,
              duration: d[d.length - 1].end,
              delay: d[0].delay,
            };
          } else b = void 0;
          return b;
        });
      })
    ).filter(function (a) {
      return !g.und(a);
    });
  }
  function O(a, b, d) {
    var c = "delay" === a ? Math.min : Math.max;
    return b.length
      ? c.apply(
          Math,
          b.map(function (b) {
            return b[a];
          })
        )
      : d[a];
  }
  function fa(a) {
    var b = G(ga, a),
      d = G(ha, a),
      c = Z(a.targets),
      e = [],
      g = B(b, d),
      h;
    for (h in a)
      g.hasOwnProperty(h) ||
        "targets" === h ||
        e.push({ name: h, offset: g.offset, tweens: aa(a[h], d) });
    a = ea(c, e);
    return B(b, {
      children: [],
      animatables: c,
      animations: a,
      duration: O("duration", a, d),
      delay: O("delay", a, d),
    });
  }
  function n(a) {
    function b() {
      return (
        window.Promise &&
        new Promise(function (a) {
          return (Q = a);
        })
      );
    }
    function d(a) {
      return f.reversed ? f.duration - a : a;
    }
    function c(a) {
      for (var b = 0, c = {}, d = f.animations, e = {}; b < d.length; ) {
        var g = d[b],
          h = g.animatable,
          m = g.tweens;
        e.tween =
          m.filter(function (b) {
            return a < b.end;
          })[0] || m[m.length - 1];
        e.isPath$1 = e.tween.isPath;
        e.round = e.tween.round;
        e.eased = e.tween.easing(
          Math.min(
            Math.max(a - e.tween.start - e.tween.delay, 0),
            e.tween.duration
          ) / e.tween.duration,
          e.tween.elasticity
        );
        m = Y(
          e.tween.to.numbers.map(
            (function (a) {
              return function (b, c) {
                c = a.isPath$1 ? 0 : a.tween.from.numbers[c];
                b = c + a.eased * (b - c);
                a.isPath$1 && (b = X(a.tween.value, b));
                a.round && (b = Math.round(b * a.round) / a.round);
                return b;
              };
            })(e)
          ),
          e.tween.to.strings
        );
        ia[g.type](h.target, g.property, m, c, h.id);
        g.currentValue = m;
        b++;
        e = {
          isPath$1: e.isPath$1,
          tween: e.tween,
          eased: e.eased,
          round: e.round,
        };
      }
      if (c)
        for (var k in c)
          E ||
            (E = C(document.body, "transform")
              ? "transform"
              : "-webkit-transform"),
            (f.animatables[k].target.style[E] = c[k].join(" "));
      f.currentTime = a;
      f.progress = (a / f.duration) * 100;
    }
    function e(a) {
      if (f[a]) f[a](f);
    }
    function g() {
      f.remaining && !0 !== f.remaining && f.remaining--;
    }
    function h(a) {
      var h = f.duration,
        l = f.offset,
        n = f.delay,
        P = f.currentTime,
        q = f.reversed,
        r = d(a),
        r = Math.min(Math.max(r, 0), h);
      if (f.children) {
        var p = f.children;
        if (r >= f.currentTime) for (var u = 0; u < p.length; u++) p[u].seek(r);
        else for (u = p.length; u--; ) p[u].seek(r);
      }
      r > l && r < h
        ? (c(r), !f.began && r >= n && ((f.began = !0), e("begin")), e("run"))
        : (r <= l && 0 !== P && (c(0), q && g()),
          r >= h && P !== h && (c(h), q || g()));
      a >= h &&
        (f.remaining
          ? ((t = m), "alternate" === f.direction && (f.reversed = !f.reversed))
          : (f.pause(),
            "Promise" in window && (Q(), (R = b())),
            f.completed || ((f.completed = !0), e("complete"))),
        (k = 0));
      e("update");
    }
    a = void 0 === a ? {} : a;
    var m,
      t,
      k = 0,
      Q = null,
      R = b(),
      f = fa(a);
    f.reset = function () {
      var a = f.direction,
        b = f.loop;
      f.currentTime = 0;
      f.progress = 0;
      f.paused = !0;
      f.began = !1;
      f.completed = !1;
      f.reversed = "reverse" === a;
      f.remaining = "alternate" === a && 1 === b ? 2 : b;
      for (a = f.children.length; a--; )
        (b = f.children[a]), b.seek(b.offset), b.reset();
    };
    f.tick = function (a) {
      m = a;
      t || (t = m);
      h((k + m - t) * n.speed);
    };
    f.seek = function (a) {
      h(d(a));
    };
    f.pause = function () {
      var a = q.indexOf(f);
      -1 < a && q.splice(a, 1);
      f.paused = !0;
    };
    f.play = function () {
      f.paused &&
        ((f.paused = !1),
        (t = 0),
        (k = d(f.currentTime)),
        q.push(f),
        z || ja());
    };
    f.reverse = function () {
      f.reversed = !f.reversed;
      t = 0;
      k = d(f.currentTime);
    };
    f.restart = function () {
      f.pause();
      f.reset();
      f.play();
    };
    f.finished = R;
    f.reset();
    f.autoplay && f.play();
    return f;
  }
  var ga = {
      update: void 0,
      begin: void 0,
      run: void 0,
      complete: void 0,
      loop: 1,
      direction: "normal",
      autoplay: !0,
      offset: 0,
    },
    ha = {
      duration: 1e3,
      delay: 0,
      easing: "easeOutElastic",
      elasticity: 500,
      round: 0,
    },
    V =
      "translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY".split(
        " "
      ),
    E,
    g = {
      arr: function (a) {
        return Array.isArray(a);
      },
      obj: function (a) {
        return -1 < Object.prototype.toString.call(a).indexOf("Object");
      },
      svg: function (a) {
        return a instanceof SVGElement;
      },
      dom: function (a) {
        return a.nodeType || g.svg(a);
      },
      str: function (a) {
        return "string" === typeof a;
      },
      fnc: function (a) {
        return "function" === typeof a;
      },
      und: function (a) {
        return "undefined" === typeof a;
      },
      hex: function (a) {
        return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a);
      },
      rgb: function (a) {
        return /^rgb/.test(a);
      },
      hsl: function (a) {
        return /^hsl/.test(a);
      },
      col: function (a) {
        return g.hex(a) || g.rgb(a) || g.hsl(a);
      },
    },
    y = (function () {
      function a(a, d, c) {
        return (((1 - 3 * c + 3 * d) * a + (3 * c - 6 * d)) * a + 3 * d) * a;
      }
      return function (b, d, c, e) {
        if (0 <= b && 1 >= b && 0 <= c && 1 >= c) {
          var g = new Float32Array(11);
          if (b !== d || c !== e)
            for (var h = 0; 11 > h; ++h) g[h] = a(0.1 * h, b, c);
          return function (h) {
            if (b === d && c === e) return h;
            if (0 === h) return 0;
            if (1 === h) return 1;
            for (var m = 0, k = 1; 10 !== k && g[k] <= h; ++k) m += 0.1;
            --k;
            var k = m + ((h - g[k]) / (g[k + 1] - g[k])) * 0.1,
              l =
                3 * (1 - 3 * c + 3 * b) * k * k +
                2 * (3 * c - 6 * b) * k +
                3 * b;
            if (0.001 <= l) {
              for (m = 0; 4 > m; ++m) {
                l =
                  3 * (1 - 3 * c + 3 * b) * k * k +
                  2 * (3 * c - 6 * b) * k +
                  3 * b;
                if (0 === l) break;
                var n = a(k, b, c) - h,
                  k = k - n / l;
              }
              h = k;
            } else if (0 === l) h = k;
            else {
              var k = m,
                m = m + 0.1,
                f = 0;
              do
                (n = k + (m - k) / 2),
                  (l = a(n, b, c) - h),
                  0 < l ? (m = n) : (k = n);
              while (1e-7 < Math.abs(l) && 10 > ++f);
              h = n;
            }
            return a(h, d, e);
          };
        }
      };
    })(),
    N = (function () {
      function a(a, b) {
        return 0 === a || 1 === a
          ? a
          : -Math.pow(2, 10 * (a - 1)) *
              Math.sin(
                (2 * (a - 1 - (b / (2 * Math.PI)) * Math.asin(1)) * Math.PI) / b
              );
      }
      var b = "Quad Cubic Quart Quint Sine Expo Circ Back Elastic".split(" "),
        d = {
          In: [
            [0.55, 0.085, 0.68, 0.53],
            [0.55, 0.055, 0.675, 0.19],
            [0.895, 0.03, 0.685, 0.22],
            [0.755, 0.05, 0.855, 0.06],
            [0.47, 0, 0.745, 0.715],
            [0.95, 0.05, 0.795, 0.035],
            [0.6, 0.04, 0.98, 0.335],
            [0.6, -0.28, 0.735, 0.045],
            a,
          ],
          Out: [
            [0.25, 0.46, 0.45, 0.94],
            [0.215, 0.61, 0.355, 1],
            [0.165, 0.84, 0.44, 1],
            [0.23, 1, 0.32, 1],
            [0.39, 0.575, 0.565, 1],
            [0.19, 1, 0.22, 1],
            [0.075, 0.82, 0.165, 1],
            [0.175, 0.885, 0.32, 1.275],
            function (b, c) {
              return 1 - a(1 - b, c);
            },
          ],
          InOut: [
            [0.455, 0.03, 0.515, 0.955],
            [0.645, 0.045, 0.355, 1],
            [0.77, 0, 0.175, 1],
            [0.86, 0, 0.07, 1],
            [0.445, 0.05, 0.55, 0.95],
            [1, 0, 0, 1],
            [0.785, 0.135, 0.15, 0.86],
            [0.68, -0.55, 0.265, 1.55],
            function (b, c) {
              return 0.5 > b ? a(2 * b, c) / 2 : 1 - a(-2 * b + 2, c) / 2;
            },
          ],
        },
        c = { linear: y(0.25, 0.25, 0.75, 0.75) },
        e = {},
        l;
      for (l in d)
        (e.type = l),
          d[e.type].forEach(
            (function (a) {
              return function (d, e) {
                c["ease" + a.type + b[e]] = g.fnc(d)
                  ? d
                  : y.apply($jscomp$this, d);
              };
            })(e)
          ),
          (e = { type: e.type });
      return c;
    })(),
    ia = {
      css: function (a, b, d) {
        return (a.style[b] = d);
      },
      attribute: function (a, b, d) {
        return a.setAttribute(b, d);
      },
      object: function (a, b, d) {
        return (a[b] = d);
      },
      transform: function (a, b, d, c, e) {
        c[e] || (c[e] = []);
        c[e].push(b + "(" + d + ")");
      },
    },
    q = [],
    z = 0,
    ja = (function () {
      function a() {
        z = requestAnimationFrame(b);
      }
      function b(b) {
        var c = q.length;
        if (c) {
          for (var d = 0; d < c; ) q[d] && q[d].tick(b), d++;
          a();
        } else cancelAnimationFrame(z), (z = 0);
      }
      return a;
    })();
  n.version = "2.0.2";
  n.speed = 1;
  n.running = q;
  n.remove = function (a) {
    a = M(a);
    for (var b = q.length; b--; )
      for (var d = q[b], c = d.animations, e = c.length; e--; )
        F(a, c[e].animatable.target) && (c.splice(e, 1), c.length || d.pause());
  };
  n.getValue = J;
  n.path = function (a, b) {
    var d = g.str(a) ? v(a)[0] : a,
      c = b || 100;
    return function (a) {
      return {
        el: d,
        property: a,
        totalLength: d.getTotalLength() * (c / 100),
      };
    };
  };
  n.setDashoffset = function (a) {
    var b = a.getTotalLength();
    a.setAttribute("stroke-dasharray", b);
    return b;
  };
  n.bezier = y;
  n.easings = N;
  n.timeline = function (a) {
    var b = n(a);
    b.pause();
    b.duration = 0;
    b.add = function (a) {
      b.children.forEach(function (a) {
        a.began = !0;
        a.completed = !0;
      });
      w(a).forEach(function (a) {
        var c = b.duration,
          d = a.offset;
        a.autoplay = !1;
        a.offset = g.und(d) ? c : K(d, c);
        b.seek(a.offset);
        a = n(a);
        a.duration > c && (b.duration = a.duration);
        a.began = !0;
        b.children.push(a);
      });
      b.reset();
      b.seek(0);
      b.autoplay && b.restart();
      return b;
    };
    return b;
  };
  n.random = function (a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  };
  return n;
});

/*!
 * Jarallax v2.0.2 (https://github.com/nk-o/jarallax)
 * Copyright 2022 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : ((e =
        "undefined" != typeof globalThis ? globalThis : e || self).jarallax =
        t());
})(this, function () {
  "use strict";
  function e(e) {
    "complete" === document.readyState || "interactive" === document.readyState
      ? e()
      : document.addEventListener("DOMContentLoaded", e, {
          capture: !0,
          once: !0,
          passive: !0,
        });
  }
  let t;
  t =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : {};
  var i = t;
  const { navigator: o } = i,
    n = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      o.userAgent
    );
  let a, s;
  function l() {
    n
      ? (!a &&
          document.body &&
          ((a = document.createElement("div")),
          (a.style.cssText =
            "position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;"),
          document.body.appendChild(a)),
        (s =
          (a ? a.clientHeight : 0) ||
          i.innerHeight ||
          document.documentElement.clientHeight))
      : (s = i.innerHeight || document.documentElement.clientHeight);
  }
  l(),
    i.addEventListener("resize", l),
    i.addEventListener("orientationchange", l),
    i.addEventListener("load", l),
    e(() => {
      l();
    });
  const r = [];
  function m() {
    r.length &&
      (r.forEach((e, t) => {
        const { instance: o, oldData: n } = e,
          a = o.$item.getBoundingClientRect(),
          l = {
            width: a.width,
            height: a.height,
            top: a.top,
            bottom: a.bottom,
            wndW: i.innerWidth,
            wndH: s,
          },
          m =
            !n ||
            n.wndW !== l.wndW ||
            n.wndH !== l.wndH ||
            n.width !== l.width ||
            n.height !== l.height,
          c = m || !n || n.top !== l.top || n.bottom !== l.bottom;
        (r[t].oldData = l), m && o.onResize(), c && o.onScroll();
      }),
      i.requestAnimationFrame(m));
  }
  let c = 0;
  class p {
    constructor(e, t) {
      const i = this;
      (i.instanceID = c),
        (c += 1),
        (i.$item = e),
        (i.defaults = {
          type: "scroll",
          speed: 0.5,
          imgSrc: null,
          imgElement: ".jarallax-img",
          imgSize: "cover",
          imgPosition: "50% 50%",
          imgRepeat: "no-repeat",
          keepImg: !1,
          elementInViewport: null,
          zIndex: -100,
          disableParallax: !1,
          disableVideo: !1,
          videoSrc: null,
          videoStartTime: 0,
          videoEndTime: 0,
          videoVolume: 0,
          videoLoop: !0,
          videoPlayOnlyVisible: !0,
          videoLazyLoading: !0,
          onScroll: null,
          onInit: null,
          onDestroy: null,
          onCoverImage: null,
        });
      const n = i.$item.dataset || {},
        a = {};
      if (
        (Object.keys(n).forEach((e) => {
          const t = e.substr(0, 1).toLowerCase() + e.substr(1);
          t && void 0 !== i.defaults[t] && (a[t] = n[e]);
        }),
        (i.options = i.extend({}, i.defaults, a, t)),
        (i.pureOptions = i.extend({}, i.options)),
        Object.keys(i.options).forEach((e) => {
          "true" === i.options[e]
            ? (i.options[e] = !0)
            : "false" === i.options[e] && (i.options[e] = !1);
        }),
        (i.options.speed = Math.min(
          2,
          Math.max(-1, parseFloat(i.options.speed))
        )),
        "string" == typeof i.options.disableParallax &&
          (i.options.disableParallax = new RegExp(i.options.disableParallax)),
        i.options.disableParallax instanceof RegExp)
      ) {
        const e = i.options.disableParallax;
        i.options.disableParallax = () => e.test(o.userAgent);
      }
      if (
        ("function" != typeof i.options.disableParallax &&
          (i.options.disableParallax = () => !1),
        "string" == typeof i.options.disableVideo &&
          (i.options.disableVideo = new RegExp(i.options.disableVideo)),
        i.options.disableVideo instanceof RegExp)
      ) {
        const e = i.options.disableVideo;
        i.options.disableVideo = () => e.test(o.userAgent);
      }
      "function" != typeof i.options.disableVideo &&
        (i.options.disableVideo = () => !1);
      let s = i.options.elementInViewport;
      s && "object" == typeof s && void 0 !== s.length && ([s] = s),
        s instanceof Element || (s = null),
        (i.options.elementInViewport = s),
        (i.image = {
          src: i.options.imgSrc || null,
          $container: null,
          useImgTag: !1,
          position: "fixed",
        }),
        i.initImg() && i.canInitParallax() && i.init();
    }
    css(e, t) {
      return "string" == typeof t
        ? i.getComputedStyle(e).getPropertyValue(t)
        : (Object.keys(t).forEach((i) => {
            e.style[i] = t[i];
          }),
          e);
    }
    extend(e, ...t) {
      return (
        (e = e || {}),
        Object.keys(t).forEach((i) => {
          t[i] &&
            Object.keys(t[i]).forEach((o) => {
              e[o] = t[i][o];
            });
        }),
        e
      );
    }
    getWindowData() {
      return {
        width: i.innerWidth || document.documentElement.clientWidth,
        height: s,
        y: document.documentElement.scrollTop,
      };
    }
    initImg() {
      const e = this;
      let t = e.options.imgElement;
      return (
        t && "string" == typeof t && (t = e.$item.querySelector(t)),
        t instanceof Element ||
          (e.options.imgSrc
            ? ((t = new Image()), (t.src = e.options.imgSrc))
            : (t = null)),
        t &&
          (e.options.keepImg
            ? (e.image.$item = t.cloneNode(!0))
            : ((e.image.$item = t), (e.image.$itemParent = t.parentNode)),
          (e.image.useImgTag = !0)),
        !!e.image.$item ||
          (null === e.image.src &&
            ((e.image.src =
              "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"),
            (e.image.bgImage = e.css(e.$item, "background-image"))),
          !(!e.image.bgImage || "none" === e.image.bgImage))
      );
    }
    canInitParallax() {
      return !this.options.disableParallax();
    }
    init() {
      const e = this,
        t = {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        };
      let o = {
        pointerEvents: "none",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        willChange: "transform,opacity",
      };
      if (!e.options.keepImg) {
        const t = e.$item.getAttribute("style");
        if (
          (t && e.$item.setAttribute("data-jarallax-original-styles", t),
          e.image.useImgTag)
        ) {
          const t = e.image.$item.getAttribute("style");
          t && e.image.$item.setAttribute("data-jarallax-original-styles", t);
        }
      }
      if (
        ("static" === e.css(e.$item, "position") &&
          e.css(e.$item, { position: "relative" }),
        "auto" === e.css(e.$item, "z-index") && e.css(e.$item, { zIndex: 0 }),
        (e.image.$container = document.createElement("div")),
        e.css(e.image.$container, t),
        e.css(e.image.$container, { "z-index": e.options.zIndex }),
        "fixed" === this.image.position &&
          e.css(e.image.$container, {
            "-webkit-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          }),
        e.image.$container.setAttribute(
          "id",
          `jarallax-container-${e.instanceID}`
        ),
        e.$item.appendChild(e.image.$container),
        e.image.useImgTag
          ? (o = e.extend(
              {
                "object-fit": e.options.imgSize,
                "object-position": e.options.imgPosition,
                "max-width": "none",
              },
              t,
              o
            ))
          : ((e.image.$item = document.createElement("div")),
            e.image.src &&
              (o = e.extend(
                {
                  "background-position": e.options.imgPosition,
                  "background-size": e.options.imgSize,
                  "background-repeat": e.options.imgRepeat,
                  "background-image":
                    e.image.bgImage || `url("${e.image.src}")`,
                },
                t,
                o
              ))),
        ("opacity" !== e.options.type &&
          "scale" !== e.options.type &&
          "scale-opacity" !== e.options.type &&
          1 !== e.options.speed) ||
          (e.image.position = "absolute"),
        "fixed" === e.image.position)
      ) {
        const t = (function (e) {
          const t = [];
          for (; null !== e.parentElement; )
            1 === (e = e.parentElement).nodeType && t.push(e);
          return t;
        })(e.$item).filter((e) => {
          const t = i.getComputedStyle(e),
            o = t["-webkit-transform"] || t["-moz-transform"] || t.transform;
          return (
            (o && "none" !== o) ||
            /(auto|scroll)/.test(t.overflow + t["overflow-y"] + t["overflow-x"])
          );
        });
        e.image.position = t.length ? "absolute" : "fixed";
      }
      (o.position = e.image.position),
        e.css(e.image.$item, o),
        e.image.$container.appendChild(e.image.$item),
        e.onResize(),
        e.onScroll(!0),
        e.options.onInit && e.options.onInit.call(e),
        "none" !== e.css(e.$item, "background-image") &&
          e.css(e.$item, { "background-image": "none" }),
        e.addToParallaxList();
    }
    addToParallaxList() {
      r.push({ instance: this }), 1 === r.length && i.requestAnimationFrame(m);
    }
    removeFromParallaxList() {
      const e = this;
      r.forEach((t, i) => {
        t.instance.instanceID === e.instanceID && r.splice(i, 1);
      });
    }
    destroy() {
      const e = this;
      e.removeFromParallaxList();
      const t = e.$item.getAttribute("data-jarallax-original-styles");
      if (
        (e.$item.removeAttribute("data-jarallax-original-styles"),
        t ? e.$item.setAttribute("style", t) : e.$item.removeAttribute("style"),
        e.image.useImgTag)
      ) {
        const i = e.image.$item.getAttribute("data-jarallax-original-styles");
        e.image.$item.removeAttribute("data-jarallax-original-styles"),
          i
            ? e.image.$item.setAttribute("style", t)
            : e.image.$item.removeAttribute("style"),
          e.image.$itemParent && e.image.$itemParent.appendChild(e.image.$item);
      }
      e.image.$container &&
        e.image.$container.parentNode.removeChild(e.image.$container),
        e.options.onDestroy && e.options.onDestroy.call(e),
        delete e.$item.jarallax;
    }
    clipContainer() {}
    coverImage() {
      const e = this,
        t = e.image.$container.getBoundingClientRect(),
        i = t.height,
        { speed: o } = e.options,
        n = "scroll" === e.options.type || "scroll-opacity" === e.options.type;
      let a = 0,
        l = i,
        r = 0;
      return (
        n &&
          (0 > o
            ? ((a = o * Math.max(i, s)), s < i && (a -= o * (i - s)))
            : (a = o * (i + s)),
          1 < o
            ? (l = Math.abs(a - s))
            : 0 > o
            ? (l = a / o + Math.abs(a))
            : (l += (s - i) * (1 - o)),
          (a /= 2)),
        (e.parallaxScrollDistance = a),
        (r = n ? (s - l) / 2 : (i - l) / 2),
        e.css(e.image.$item, {
          height: `${l}px`,
          marginTop: `${r}px`,
          left: "fixed" === e.image.position ? `${t.left}px` : "0",
          width: `${t.width}px`,
        }),
        e.options.onCoverImage && e.options.onCoverImage.call(e),
        { image: { height: l, marginTop: r }, container: t }
      );
    }
    isVisible() {
      return this.isElementInViewport || !1;
    }
    onScroll(e) {
      const t = this,
        o = t.$item.getBoundingClientRect(),
        n = o.top,
        a = o.height,
        l = {};
      let r = o;
      if (
        (t.options.elementInViewport &&
          (r = t.options.elementInViewport.getBoundingClientRect()),
        (t.isElementInViewport =
          0 <= r.bottom &&
          0 <= r.right &&
          r.top <= s &&
          r.left <= i.innerWidth),
        !e && !t.isElementInViewport)
      )
        return;
      const m = Math.max(0, n),
        c = Math.max(0, a + n),
        p = Math.max(0, -n),
        d = Math.max(0, n + a - s),
        g = Math.max(0, a - (n + a - s)),
        u = Math.max(0, -n + s - a),
        f = 1 - ((s - n) / (s + a)) * 2;
      let h = 1;
      if (
        (a < s
          ? (h = 1 - (p || d) / a)
          : c <= s
          ? (h = c / s)
          : g <= s && (h = g / s),
        ("opacity" !== t.options.type &&
          "scale-opacity" !== t.options.type &&
          "scroll-opacity" !== t.options.type) ||
          ((l.transform = "translate3d(0,0,0)"), (l.opacity = h)),
        "scale" === t.options.type || "scale-opacity" === t.options.type)
      ) {
        let e = 1;
        0 > t.options.speed
          ? (e -= t.options.speed * h)
          : (e += t.options.speed * (1 - h)),
          (l.transform = `scale(${e}) translate3d(0,0,0)`);
      }
      if ("scroll" === t.options.type || "scroll-opacity" === t.options.type) {
        let e = t.parallaxScrollDistance * f;
        "absolute" === t.image.position && (e -= n),
          (l.transform = `translate3d(0,${e}px,0)`);
      }
      t.css(t.image.$item, l),
        t.options.onScroll &&
          t.options.onScroll.call(t, {
            section: o,
            beforeTop: m,
            beforeTopEnd: c,
            afterTop: p,
            beforeBottom: d,
            beforeBottomEnd: g,
            afterBottom: u,
            visiblePercent: h,
            fromViewportCenter: f,
          });
    }
    onResize() {
      this.coverImage();
    }
  }
  const d = function (e, t, ...i) {
    ("object" == typeof HTMLElement
      ? e instanceof HTMLElement
      : e &&
        "object" == typeof e &&
        null !== e &&
        1 === e.nodeType &&
        "string" == typeof e.nodeName) && (e = [e]);
    const o = e.length;
    let n,
      a = 0;
    for (; a < o; a += 1)
      if (
        ("object" == typeof t || void 0 === t
          ? e[a].jarallax || (e[a].jarallax = new p(e[a], t))
          : e[a].jarallax && (n = e[a].jarallax[t].apply(e[a].jarallax, i)),
        void 0 !== n)
      )
        return n;
    return e;
  };
  d.constructor = p;
  const g = i.jQuery;
  if (void 0 !== g) {
    const e = function (...e) {
      Array.prototype.unshift.call(e, this);
      const t = d.apply(i, e);
      return "object" != typeof t ? t : this;
    };
    e.constructor = d.constructor;
    const t = g.fn.jarallax;
    (g.fn.jarallax = e),
      (g.fn.jarallax.noConflict = function () {
        return (g.fn.jarallax = t), this;
      });
  }
  return (
    e(() => {
      d(document.querySelectorAll("[data-jarallax]"));
    }),
    d
  );
});
//# sourceMappingURL=jarallax.min.js.map
