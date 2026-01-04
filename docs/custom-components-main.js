
(function(l, r) { if (!l || l.getElementById('hot-reloader')) return; r = l.createElement('script'); r.async = 1; r.src = 'http://localhost:35729/livereload.js?snipver=1'; r.id = 'hot-reloader'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return _regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function (t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {
    return this;
  }), _regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (_regenerator = function () {
    return {
      w: i,
      m: f
    };
  })();
}
function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  _regeneratorDefine = function (e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, _regeneratorDefine(e, r, n, t);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/*! tailwindcss v4.1.18 | MIT License | https://tailwindcss.com */\n@layer properties;\n@layer theme, base, components, utilities;\n@layer theme {\n  :root, :host {\n    --font-sans: ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\",\n      \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n    --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\",\n      \"Courier New\", monospace;\n    --color-red-50: oklch(97.1% 0.013 17.38);\n    --color-red-500: oklch(63.7% 0.237 25.331);\n    --color-red-600: oklch(57.7% 0.245 27.325);\n    --color-red-700: oklch(50.5% 0.213 27.518);\n    --color-amber-50: oklch(98.7% 0.022 95.277);\n    --color-amber-600: oklch(66.6% 0.179 58.318);\n    --color-green-50: oklch(98.2% 0.018 155.826);\n    --color-green-500: oklch(72.3% 0.219 149.579);\n    --color-green-600: oklch(62.7% 0.194 149.214);\n    --color-blue-50: oklch(97% 0.014 254.604);\n    --color-blue-500: oklch(62.3% 0.214 259.815);\n    --color-blue-600: oklch(54.6% 0.245 262.881);\n    --color-indigo-50: oklch(96.2% 0.018 272.314);\n    --color-indigo-500: oklch(58.5% 0.233 277.117);\n    --color-indigo-600: oklch(51.1% 0.262 276.966);\n    --color-indigo-700: oklch(45.7% 0.24 277.023);\n    --color-slate-50: oklch(98.4% 0.003 247.858);\n    --color-slate-100: oklch(96.8% 0.007 247.896);\n    --color-slate-200: oklch(92.9% 0.013 255.508);\n    --color-slate-300: oklch(86.9% 0.022 252.894);\n    --color-slate-400: oklch(70.4% 0.04 256.788);\n    --color-slate-500: oklch(55.4% 0.046 257.417);\n    --color-slate-600: oklch(44.6% 0.043 257.281);\n    --color-slate-700: oklch(37.2% 0.044 257.287);\n    --color-slate-800: oklch(27.9% 0.041 260.031);\n    --color-slate-900: oklch(20.8% 0.042 265.755);\n    --color-white: #fff;\n    --spacing: 0.25rem;\n    --text-xs: 0.75rem;\n    --text-xs--line-height: calc(1 / 0.75);\n    --text-sm: 0.875rem;\n    --text-sm--line-height: calc(1.25 / 0.875);\n    --text-base: 1rem;\n    --text-base--line-height: calc(1.5 / 1);\n    --text-lg: 1.125rem;\n    --text-lg--line-height: calc(1.75 / 1.125);\n    --text-xl: 1.25rem;\n    --text-xl--line-height: calc(1.75 / 1.25);\n    --font-weight-medium: 500;\n    --font-weight-semibold: 600;\n    --font-weight-bold: 700;\n    --tracking-wider: 0.05em;\n    --leading-relaxed: 1.625;\n    --radius-2xl: 1rem;\n    --ease-in: cubic-bezier(0.4, 0, 1, 1);\n    --ease-out: cubic-bezier(0, 0, 0.2, 1);\n    --animate-spin: spin 1s linear infinite;\n    --blur-sm: 8px;\n    --default-transition-duration: 150ms;\n    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);\n    --default-font-family: var(--font-sans);\n    --default-mono-font-family: var(--font-mono);\n  }\n}\n@layer base {\n  *, ::after, ::before, ::backdrop, ::file-selector-button {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    border: 0 solid;\n  }\n  html, :host {\n    line-height: 1.5;\n    -webkit-text-size-adjust: 100%;\n    -moz-tab-size: 4;\n      -o-tab-size: 4;\n         tab-size: 4;\n    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\");\n    font-feature-settings: var(--default-font-feature-settings, normal);\n    font-variation-settings: var(--default-font-variation-settings, normal);\n    -webkit-tap-highlight-color: transparent;\n  }\n  hr {\n    height: 0;\n    color: inherit;\n    border-top-width: 1px;\n  }\n  abbr:where([title]) {\n    -webkit-text-decoration: underline dotted;\n    text-decoration: underline dotted;\n  }\n  h1, h2, h3, h4, h5, h6 {\n    font-size: inherit;\n    font-weight: inherit;\n  }\n  a {\n    color: inherit;\n    -webkit-text-decoration: inherit;\n    text-decoration: inherit;\n  }\n  b, strong {\n    font-weight: bolder;\n  }\n  code, kbd, samp, pre {\n    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace);\n    font-feature-settings: var(--default-mono-font-feature-settings, normal);\n    font-variation-settings: var(--default-mono-font-variation-settings, normal);\n    font-size: 1em;\n  }\n  small {\n    font-size: 80%;\n  }\n  sub, sup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n  }\n  sub {\n    bottom: -0.25em;\n  }\n  sup {\n    top: -0.5em;\n  }\n  table {\n    text-indent: 0;\n    border-color: inherit;\n    border-collapse: collapse;\n  }\n  :-moz-focusring {\n    outline: auto;\n  }\n  progress {\n    vertical-align: baseline;\n  }\n  summary {\n    display: list-item;\n  }\n  ol, ul, menu {\n    list-style: none;\n  }\n  img, svg, video, canvas, audio, iframe, embed, object {\n    display: block;\n    vertical-align: middle;\n  }\n  img, video {\n    max-width: 100%;\n    height: auto;\n  }\n  button, input, select, optgroup, textarea, ::file-selector-button {\n    font: inherit;\n    font-feature-settings: inherit;\n    font-variation-settings: inherit;\n    letter-spacing: inherit;\n    color: inherit;\n    border-radius: 0;\n    background-color: transparent;\n    opacity: 1;\n  }\n  :where(select:is([multiple], [size])) optgroup {\n    font-weight: bolder;\n  }\n  :where(select:is([multiple], [size])) optgroup option {\n    padding-inline-start: 20px;\n  }\n  ::file-selector-button {\n    margin-inline-end: 4px;\n  }\n  ::-moz-placeholder {\n    opacity: 1;\n  }\n  ::placeholder {\n    opacity: 1;\n  }\n  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {\n    ::-moz-placeholder {\n      color: currentcolor;\n      @supports (color: color-mix(in lab, red, red)) {\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n      }\n    }\n    ::placeholder {\n      color: currentcolor;\n      @supports (color: color-mix(in lab, red, red)) {\n        color: color-mix(in oklab, currentcolor 50%, transparent);\n      }\n    }\n  }\n  textarea {\n    resize: vertical;\n  }\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n  ::-webkit-date-and-time-value {\n    min-height: 1lh;\n    text-align: inherit;\n  }\n  ::-webkit-datetime-edit {\n    display: inline-flex;\n  }\n  ::-webkit-datetime-edit-fields-wrapper {\n    padding: 0;\n  }\n  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {\n    padding-block: 0;\n  }\n  ::-webkit-calendar-picker-indicator {\n    line-height: 1;\n  }\n  :-moz-ui-invalid {\n    box-shadow: none;\n  }\n  button, input:where([type=\"button\"], [type=\"reset\"], [type=\"submit\"]), ::file-selector-button {\n    -webkit-appearance: button;\n       -moz-appearance: button;\n            appearance: button;\n  }\n  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {\n    height: auto;\n  }\n  [hidden]:where(:not([hidden=\"until-found\"])) {\n    display: none !important;\n  }\n}\n@layer utilities {\n  .pointer-events-auto {\n    pointer-events: auto;\n  }\n  .pointer-events-none {\n    pointer-events: none;\n  }\n  .visible {\n    visibility: visible;\n  }\n  .absolute {\n    position: absolute;\n  }\n  .fixed {\n    position: fixed;\n  }\n  .relative {\n    position: relative;\n  }\n  .inset-0 {\n    inset: calc(var(--spacing) * 0);\n  }\n  .top-0 {\n    top: calc(var(--spacing) * 0);\n  }\n  .top-full {\n    top: 100%;\n  }\n  .left-0 {\n    left: calc(var(--spacing) * 0);\n  }\n  .z-0 {\n    z-index: 0;\n  }\n  .z-10 {\n    z-index: 10;\n  }\n  .z-20 {\n    z-index: 20;\n  }\n  .z-50 {\n    z-index: 50;\n  }\n  .container {\n    width: 100%;\n    @media (width >= 40rem) {\n      max-width: 40rem;\n    }\n    @media (width >= 48rem) {\n      max-width: 48rem;\n    }\n    @media (width >= 64rem) {\n      max-width: 64rem;\n    }\n    @media (width >= 80rem) {\n      max-width: 80rem;\n    }\n    @media (width >= 96rem) {\n      max-width: 96rem;\n    }\n  }\n  .my-2 {\n    margin-block: calc(var(--spacing) * 2);\n  }\n  .mt-2 {\n    margin-top: calc(var(--spacing) * 2);\n  }\n  .mt-3 {\n    margin-top: calc(var(--spacing) * 3);\n  }\n  .mt-4 {\n    margin-top: calc(var(--spacing) * 4);\n  }\n  .mt-\\[6px\\] {\n    margin-top: 6px;\n  }\n  .mt-\\[8px\\] {\n    margin-top: 8px;\n  }\n  .mt-\\[18px\\] {\n    margin-top: 18px;\n  }\n  .mb-1 {\n    margin-bottom: calc(var(--spacing) * 1);\n  }\n  .mb-2 {\n    margin-bottom: calc(var(--spacing) * 2);\n  }\n  .ml-2 {\n    margin-left: calc(var(--spacing) * 2);\n  }\n  .block {\n    display: block;\n  }\n  .flex {\n    display: flex;\n  }\n  .hidden {\n    display: none;\n  }\n  .inline {\n    display: inline;\n  }\n  .table {\n    display: table;\n  }\n  .h-8 {\n    height: calc(var(--spacing) * 8);\n  }\n  .h-\\[8px\\] {\n    height: 8px;\n  }\n  .h-\\[12px\\] {\n    height: 12px;\n  }\n  .h-\\[36px\\] {\n    height: 36px;\n  }\n  .h-full {\n    height: 100%;\n  }\n  .max-h-\\[240px\\] {\n    max-height: 240px;\n  }\n  .w-64 {\n    width: calc(var(--spacing) * 64);\n  }\n  .w-\\[8px\\] {\n    width: 8px;\n  }\n  .w-\\[12px\\] {\n    width: 12px;\n  }\n  .w-\\[36px\\] {\n    width: 36px;\n  }\n  .w-\\[92\\%\\] {\n    width: 92%;\n  }\n  .w-full {\n    width: 100%;\n  }\n  .max-w-\\[150px\\] {\n    max-width: 150px;\n  }\n  .max-w-\\[420px\\] {\n    max-width: 420px;\n  }\n  .flex-1 {\n    flex: 1;\n  }\n  .flex-shrink {\n    flex-shrink: 1;\n  }\n  .shrink {\n    flex-shrink: 1;\n  }\n  .border-collapse {\n    border-collapse: collapse;\n  }\n  .transform {\n    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);\n  }\n  .animate-spin {\n    animation: var(--animate-spin);\n  }\n  .cursor-crosshair {\n    cursor: crosshair;\n  }\n  .cursor-pointer {\n    cursor: pointer;\n  }\n  .resize {\n    resize: both;\n  }\n  .list-inside {\n    list-style-position: inside;\n  }\n  .list-decimal {\n    list-style-type: decimal;\n  }\n  .list-disc {\n    list-style-type: disc;\n  }\n  .flex-col {\n    flex-direction: column;\n  }\n  .items-center {\n    align-items: center;\n  }\n  .items-start {\n    align-items: flex-start;\n  }\n  .justify-between {\n    justify-content: space-between;\n  }\n  .justify-center {\n    justify-content: center;\n  }\n  .justify-end {\n    justify-content: flex-end;\n  }\n  .gap-1 {\n    gap: calc(var(--spacing) * 1);\n  }\n  .gap-2 {\n    gap: calc(var(--spacing) * 2);\n  }\n  .gap-\\[4px\\] {\n    gap: 4px;\n  }\n  .gap-\\[8px\\] {\n    gap: 8px;\n  }\n  .gap-\\[12px\\] {\n    gap: 12px;\n  }\n  .space-y-1 {\n    :where(& > :not(:last-child)) {\n      --tw-space-y-reverse: 0;\n      margin-block-start: calc(calc(var(--spacing) * 1) * var(--tw-space-y-reverse));\n      margin-block-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-y-reverse)));\n    }\n  }\n  .truncate {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .overflow-hidden {\n    overflow: hidden;\n  }\n  .overflow-visible {\n    overflow: visible;\n  }\n  .overflow-x-auto {\n    overflow-x: auto;\n  }\n  .overflow-y-auto {\n    overflow-y: auto;\n  }\n  .rounded {\n    border-radius: 0.25rem;\n  }\n  .rounded-2xl {\n    border-radius: var(--radius-2xl);\n  }\n  .rounded-\\[6px\\] {\n    border-radius: 6px;\n  }\n  .rounded-\\[8px\\] {\n    border-radius: 8px;\n  }\n  .rounded-\\[12px\\] {\n    border-radius: 12px;\n  }\n  .rounded-full {\n    border-radius: calc(infinity * 1px);\n  }\n  .rounded-t-\\[12px\\] {\n    border-top-left-radius: 12px;\n    border-top-right-radius: 12px;\n  }\n  .border {\n    border-style: var(--tw-border-style);\n    border-width: 1px;\n  }\n  .border-2 {\n    border-style: var(--tw-border-style);\n    border-width: 2px;\n  }\n  .border-t {\n    border-top-style: var(--tw-border-style);\n    border-top-width: 1px;\n  }\n  .border-b {\n    border-bottom-style: var(--tw-border-style);\n    border-bottom-width: 1px;\n  }\n  .border-blue-500 {\n    border-color: var(--color-blue-500);\n  }\n  .border-green-500 {\n    border-color: var(--color-green-500);\n  }\n  .border-slate-200 {\n    border-color: var(--color-slate-200);\n  }\n  .border-slate-300 {\n    border-color: var(--color-slate-300);\n  }\n  .border-slate-400 {\n    border-color: var(--color-slate-400);\n  }\n  .bg-blue-500 {\n    background-color: var(--color-blue-500);\n  }\n  .bg-green-50 {\n    background-color: var(--color-green-50);\n  }\n  .bg-green-500 {\n    background-color: var(--color-green-500);\n  }\n  .bg-indigo-50 {\n    background-color: var(--color-indigo-50);\n  }\n  .bg-indigo-600 {\n    background-color: var(--color-indigo-600);\n  }\n  .bg-red-50 {\n    background-color: var(--color-red-50);\n  }\n  .bg-red-600 {\n    background-color: var(--color-red-600);\n  }\n  .bg-slate-50 {\n    background-color: var(--color-slate-50);\n  }\n  .bg-slate-100 {\n    background-color: var(--color-slate-100);\n  }\n  .bg-slate-200 {\n    background-color: var(--color-slate-200);\n  }\n  .bg-slate-800 {\n    background-color: var(--color-slate-800);\n  }\n  .bg-slate-900 {\n    background-color: var(--color-slate-900);\n  }\n  .bg-slate-900\\/40 {\n    background-color: color-mix(in srgb, oklch(20.8% 0.042 265.755) 40%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      background-color: color-mix(in oklab, var(--color-slate-900) 40%, transparent);\n    }\n  }\n  .bg-white {\n    background-color: var(--color-white);\n  }\n  .p-2 {\n    padding: calc(var(--spacing) * 2);\n  }\n  .p-3 {\n    padding: calc(var(--spacing) * 3);\n  }\n  .p-4 {\n    padding: calc(var(--spacing) * 4);\n  }\n  .p-\\[4px\\] {\n    padding: 4px;\n  }\n  .p-\\[6px\\] {\n    padding: 6px;\n  }\n  .p-\\[8px\\] {\n    padding: 8px;\n  }\n  .p-\\[20px\\] {\n    padding: 20px;\n  }\n  .px-1 {\n    padding-inline: calc(var(--spacing) * 1);\n  }\n  .px-4 {\n    padding-inline: calc(var(--spacing) * 4);\n  }\n  .px-\\[12px\\] {\n    padding-inline: 12px;\n  }\n  .px-\\[14px\\] {\n    padding-inline: 14px;\n  }\n  .px-\\[16px\\] {\n    padding-inline: 16px;\n  }\n  .py-0 {\n    padding-block: calc(var(--spacing) * 0);\n  }\n  .py-0\\.5 {\n    padding-block: calc(var(--spacing) * 0.5);\n  }\n  .py-\\[8px\\] {\n    padding-block: 8px;\n  }\n  .text-center {\n    text-align: center;\n  }\n  .text-left {\n    text-align: left;\n  }\n  .font-mono {\n    font-family: var(--font-mono);\n  }\n  .font-sans {\n    font-family: var(--font-sans);\n  }\n  .text-base {\n    font-size: var(--text-base);\n    line-height: var(--tw-leading, var(--text-base--line-height));\n  }\n  .text-lg {\n    font-size: var(--text-lg);\n    line-height: var(--tw-leading, var(--text-lg--line-height));\n  }\n  .text-sm {\n    font-size: var(--text-sm);\n    line-height: var(--tw-leading, var(--text-sm--line-height));\n  }\n  .text-xl {\n    font-size: var(--text-xl);\n    line-height: var(--tw-leading, var(--text-xl--line-height));\n  }\n  .text-xs {\n    font-size: var(--text-xs);\n    line-height: var(--tw-leading, var(--text-xs--line-height));\n  }\n  .text-\\[12px\\] {\n    font-size: 12px;\n  }\n  .text-\\[13px\\] {\n    font-size: 13px;\n  }\n  .text-\\[14px\\] {\n    font-size: 14px;\n  }\n  .text-\\[16px\\] {\n    font-size: 16px;\n  }\n  .text-\\[18px\\] {\n    font-size: 18px;\n  }\n  .leading-relaxed {\n    --tw-leading: var(--leading-relaxed);\n    line-height: var(--leading-relaxed);\n  }\n  .font-bold {\n    --tw-font-weight: var(--font-weight-bold);\n    font-weight: var(--font-weight-bold);\n  }\n  .font-medium {\n    --tw-font-weight: var(--font-weight-medium);\n    font-weight: var(--font-weight-medium);\n  }\n  .font-semibold {\n    --tw-font-weight: var(--font-weight-semibold);\n    font-weight: var(--font-weight-semibold);\n  }\n  .tracking-wider {\n    --tw-tracking: var(--tracking-wider);\n    letter-spacing: var(--tracking-wider);\n  }\n  .text-amber-600 {\n    color: var(--color-amber-600);\n  }\n  .text-blue-500 {\n    color: var(--color-blue-500);\n  }\n  .text-green-600 {\n    color: var(--color-green-600);\n  }\n  .text-indigo-600 {\n    color: var(--color-indigo-600);\n  }\n  .text-red-600 {\n    color: var(--color-red-600);\n  }\n  .text-slate-100 {\n    color: var(--color-slate-100);\n  }\n  .text-slate-300 {\n    color: var(--color-slate-300);\n  }\n  .text-slate-400 {\n    color: var(--color-slate-400);\n  }\n  .text-slate-500 {\n    color: var(--color-slate-500);\n  }\n  .text-slate-600 {\n    color: var(--color-slate-600);\n  }\n  .text-slate-700 {\n    color: var(--color-slate-700);\n  }\n  .text-slate-800 {\n    color: var(--color-slate-800);\n  }\n  .text-slate-900 {\n    color: var(--color-slate-900);\n  }\n  .text-white {\n    color: var(--color-white);\n  }\n  .uppercase {\n    text-transform: uppercase;\n  }\n  .italic {\n    font-style: italic;\n  }\n  .underline {\n    text-decoration-line: underline;\n  }\n  .shadow-2xl {\n    --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-lg {\n    --tw-shadow: 0 10px 15px -3px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 4px 6px -4px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-sm {\n    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-xl {\n    --tw-shadow: 0 20px 25px -5px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 8px 10px -6px var(--tw-shadow-color, rgb(0 0 0 / 0.1));\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .ring-1 {\n    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);\n    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);\n  }\n  .shadow-green-500 {\n    --tw-shadow-color: oklch(72.3% 0.219 149.579);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-shadow-color: color-mix(in oklab, var(--color-green-500) var(--tw-shadow-alpha), transparent);\n    }\n  }\n  .shadow-green-500\\/30 {\n    --tw-shadow-color: color-mix(in srgb, oklch(72.3% 0.219 149.579) 30%, transparent);\n    @supports (color: color-mix(in lab, red, red)) {\n      --tw-shadow-color: color-mix(in oklab, color-mix(in oklab, var(--color-green-500) 30%, transparent) var(--tw-shadow-alpha), transparent);\n    }\n  }\n  .ring-green-500 {\n    --tw-ring-color: var(--color-green-500);\n  }\n  .outline {\n    outline-style: var(--tw-outline-style);\n    outline-width: 1px;\n  }\n  .filter {\n    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);\n  }\n  .backdrop-blur-sm {\n    --tw-backdrop-blur: blur(var(--blur-sm));\n    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  }\n  .backdrop-filter {\n    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);\n  }\n  .transition {\n    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, backdrop-filter, display, content-visibility, overlay, pointer-events;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-all {\n    transition-property: all;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-colors {\n    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-shadow {\n    transition-property: box-shadow;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .transition-transform {\n    transition-property: transform, translate, scale, rotate;\n    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));\n    transition-duration: var(--tw-duration, var(--default-transition-duration));\n  }\n  .duration-100 {\n    --tw-duration: 100ms;\n    transition-duration: 100ms;\n  }\n  .duration-150 {\n    --tw-duration: 150ms;\n    transition-duration: 150ms;\n  }\n  .duration-200 {\n    --tw-duration: 200ms;\n    transition-duration: 200ms;\n  }\n  .ease-in {\n    --tw-ease: var(--ease-in);\n    transition-timing-function: var(--ease-in);\n  }\n  .ease-out {\n    --tw-ease: var(--ease-out);\n    transition-timing-function: var(--ease-out);\n  }\n  .group-hover\\:scale-110 {\n    &:is(:where(.group):hover *) {\n      @media (hover: hover) {\n        --tw-scale-x: 110%;\n        --tw-scale-y: 110%;\n        --tw-scale-z: 110%;\n        scale: var(--tw-scale-x) var(--tw-scale-y);\n      }\n    }\n  }\n  .group-hover\\:stroke-red-500 {\n    &:is(:where(.group):hover *) {\n      @media (hover: hover) {\n        stroke: var(--color-red-500);\n      }\n    }\n  }\n  .group-hover\\:text-slate-600 {\n    &:is(:where(.group):hover *) {\n      @media (hover: hover) {\n        color: var(--color-slate-600);\n      }\n    }\n  }\n  .first\\:mt-0 {\n    &:first-child {\n      margin-top: calc(var(--spacing) * 0);\n    }\n  }\n  .last\\:mb-0 {\n    &:last-child {\n      margin-bottom: calc(var(--spacing) * 0);\n    }\n  }\n  .hover\\:border-blue-600 {\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-blue-600);\n      }\n    }\n  }\n  .hover\\:border-indigo-500 {\n    &:hover {\n      @media (hover: hover) {\n        border-color: var(--color-indigo-500);\n      }\n    }\n  }\n  .hover\\:bg-amber-50 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-amber-50);\n      }\n    }\n  }\n  .hover\\:bg-blue-50 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-50);\n      }\n    }\n  }\n  .hover\\:bg-blue-600 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-blue-600);\n      }\n    }\n  }\n  .hover\\:bg-green-600 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-green-600);\n      }\n    }\n  }\n  .hover\\:bg-indigo-50 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-50);\n      }\n    }\n  }\n  .hover\\:bg-indigo-700 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-indigo-700);\n      }\n    }\n  }\n  .hover\\:bg-red-50 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-50);\n      }\n    }\n  }\n  .hover\\:bg-red-700 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-red-700);\n      }\n    }\n  }\n  .hover\\:bg-slate-50 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-50);\n      }\n    }\n  }\n  .hover\\:bg-slate-100 {\n    &:hover {\n      @media (hover: hover) {\n        background-color: var(--color-slate-100);\n      }\n    }\n  }\n  .hover\\:text-amber-600 {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-amber-600);\n      }\n    }\n  }\n  .hover\\:text-blue-600 {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-blue-600);\n      }\n    }\n  }\n  .hover\\:text-red-500 {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-500);\n      }\n    }\n  }\n  .hover\\:text-red-600 {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-red-600);\n      }\n    }\n  }\n  .hover\\:text-slate-900 {\n    &:hover {\n      @media (hover: hover) {\n        color: var(--color-slate-900);\n      }\n    }\n  }\n  .sm\\:block {\n    @media (width >= 40rem) {\n      display: block;\n    }\n  }\n  .md\\:block {\n    @media (width >= 48rem) {\n      display: block;\n    }\n  }\n}\n@property --tw-rotate-x {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-rotate-y {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-rotate-z {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-skew-x {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-skew-y {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-space-y-reverse {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0;\n}\n@property --tw-border-style {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: solid;\n}\n@property --tw-leading {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-font-weight {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-tracking {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-inset-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-inset-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-inset-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-ring-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ring-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-inset-ring-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-inset-ring-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-ring-inset {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ring-offset-width {\n  syntax: \"<length>\";\n  inherits: false;\n  initial-value: 0px;\n}\n@property --tw-ring-offset-color {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: #fff;\n}\n@property --tw-ring-offset-shadow {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 0 0 #0000;\n}\n@property --tw-outline-style {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: solid;\n}\n@property --tw-blur {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-brightness {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-contrast {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-grayscale {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-hue-rotate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-invert {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-opacity {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-saturate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-sepia {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow-color {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-drop-shadow-alpha {\n  syntax: \"<percentage>\";\n  inherits: false;\n  initial-value: 100%;\n}\n@property --tw-drop-shadow-size {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-blur {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-brightness {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-contrast {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-grayscale {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-hue-rotate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-invert {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-opacity {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-saturate {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-backdrop-sepia {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-duration {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-ease {\n  syntax: \"*\";\n  inherits: false;\n}\n@property --tw-scale-x {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@property --tw-scale-y {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@property --tw-scale-z {\n  syntax: \"*\";\n  inherits: false;\n  initial-value: 1;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@layer properties {\n  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {\n    *, ::before, ::after, ::backdrop {\n      --tw-rotate-x: initial;\n      --tw-rotate-y: initial;\n      --tw-rotate-z: initial;\n      --tw-skew-x: initial;\n      --tw-skew-y: initial;\n      --tw-space-y-reverse: 0;\n      --tw-border-style: solid;\n      --tw-leading: initial;\n      --tw-font-weight: initial;\n      --tw-tracking: initial;\n      --tw-shadow: 0 0 #0000;\n      --tw-shadow-color: initial;\n      --tw-shadow-alpha: 100%;\n      --tw-inset-shadow: 0 0 #0000;\n      --tw-inset-shadow-color: initial;\n      --tw-inset-shadow-alpha: 100%;\n      --tw-ring-color: initial;\n      --tw-ring-shadow: 0 0 #0000;\n      --tw-inset-ring-color: initial;\n      --tw-inset-ring-shadow: 0 0 #0000;\n      --tw-ring-inset: initial;\n      --tw-ring-offset-width: 0px;\n      --tw-ring-offset-color: #fff;\n      --tw-ring-offset-shadow: 0 0 #0000;\n      --tw-outline-style: solid;\n      --tw-blur: initial;\n      --tw-brightness: initial;\n      --tw-contrast: initial;\n      --tw-grayscale: initial;\n      --tw-hue-rotate: initial;\n      --tw-invert: initial;\n      --tw-opacity: initial;\n      --tw-saturate: initial;\n      --tw-sepia: initial;\n      --tw-drop-shadow: initial;\n      --tw-drop-shadow-color: initial;\n      --tw-drop-shadow-alpha: 100%;\n      --tw-drop-shadow-size: initial;\n      --tw-backdrop-blur: initial;\n      --tw-backdrop-brightness: initial;\n      --tw-backdrop-contrast: initial;\n      --tw-backdrop-grayscale: initial;\n      --tw-backdrop-hue-rotate: initial;\n      --tw-backdrop-invert: initial;\n      --tw-backdrop-opacity: initial;\n      --tw-backdrop-saturate: initial;\n      --tw-backdrop-sepia: initial;\n      --tw-duration: initial;\n      --tw-ease: initial;\n      --tw-scale-x: 1;\n      --tw-scale-y: 1;\n      --tw-scale-z: 1;\n    }\n  }\n}\n";
styleInject(css_248z);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const toCamelCase = (string) => string.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
);
const toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
const mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
const hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
};

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const Icon = React.forwardRef(
  ({
    color = "currentColor",
    size = 24,
    strokeWidth = 2,
    absoluteStrokeWidth,
    className = "",
    children,
    iconNode,
    ...rest
  }, ref) => React.createElement(
    "svg",
    {
      ref,
      ...defaultAttributes,
      width: size,
      height: size,
      stroke: color,
      strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
      className: mergeClasses("lucide", className),
      ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
      ...rest
    },
    [
      ...iconNode.map(([tag, attrs]) => React.createElement(tag, attrs)),
      ...Array.isArray(children) ? children : [children]
    ]
  )
);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const createLucideIcon = (iconName, iconNode) => {
  const Component = React.forwardRef(
    ({ className, ...props }, ref) => React.createElement(Icon, {
      ref,
      iconNode,
      className: mergeClasses(
        `lucide-${toKebabCase(toPascalCase(iconName))}`,
        `lucide-${iconName}`,
        className
      ),
      ...props
    })
  );
  Component.displayName = toPascalCase(iconName);
  return Component;
};

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$e = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$e);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$d = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$d);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$c = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$c);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$b = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$b);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$a = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$a);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$9 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$9);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$8 = [
  [
    "path",
    {
      d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
      key: "10ikf1"
    }
  ]
];
const Play = createLucideIcon("play", __iconNode$8);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$7 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$7);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$6 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$6);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$5 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$5);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$4 = [
  ["path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7", key: "1m0v6g" }],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2"
    }
  ]
];
const SquarePen = createLucideIcon("square-pen", __iconNode$4);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$3 = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$3);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$2 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$2);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode$1);

/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */

const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);

/**
 * MOCK DATA
 * The hierarchical structure for Agents.
 */
var AGENT_TREE = {
  Shared: {
    "Content Creation": ["Blog Writer", "Tweet Generator", "SEO Optimizer"],
    "Data Analysis": ["Market Trends", "Sentiment Analyzer", "Chart Builder"],
    "Utility": ["Translator", "Summarizer"]
  },
  Users: {
    "user_jdoe": ["My Calendar", "Email Sorter"],
    "user_alice": ["Code Reviewer", "Bug Hunter"],
    "team_alpha": ["Sprint Planner", "Jira Sync"]
  }
};

/**
 * UTILS
 */
var generateId = function generateId() {
  return Math.random().toString(36).substr(2, 9);
};

// Simple markdown renderer
var renderMarkdown = function renderMarkdown(text) {
  if (!text) return null;
  var elements = [];

  // First, extract code blocks
  var codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  var codeBlocks = [];
  var codeBlockIdx = 0;
  var processedText = text.replace(codeBlockRegex, function (match, lang, code) {
    var id = "__CODEBLOCK_".concat(codeBlockIdx++, "__");
    codeBlocks.push({
      id: id,
      lang: lang || '',
      code: code.trim()
    });
    return id;
  });

  // Split by double newlines for paragraphs
  var paragraphs = processedText.split(/\n\n+/);
  paragraphs.forEach(function (para, idx) {
    para = para.trim();
    if (!para) return;

    // Check if this is a code block placeholder
    if (para.startsWith('__CODEBLOCK_')) {
      var codeId = para.replace(/__CODEBLOCK_|__/g, '');
      var codeBlock = codeBlocks.find(function (cb) {
        return cb.id === "__CODEBLOCK_".concat(codeId, "__");
      });
      if (codeBlock) {
        elements.push(/*#__PURE__*/React.createElement('pre', {
          key: "code-".concat(idx),
          className: 'bg-slate-800 text-slate-100 p-3 rounded text-xs overflow-x-auto my-2'
        }, /*#__PURE__*/React.createElement('code', null, codeBlock.code)));
      }
      return;
    }

    // Headers
    if (para.startsWith('# ')) {
      elements.push(/*#__PURE__*/React.createElement('h1', {
        key: idx,
        className: 'text-xl font-bold mb-2 mt-4 first:mt-0'
      }, para.substring(2)));
      return;
    }
    if (para.startsWith('## ')) {
      elements.push(/*#__PURE__*/React.createElement('h2', {
        key: idx,
        className: 'text-lg font-semibold mb-2 mt-3 first:mt-0'
      }, para.substring(3)));
      return;
    }
    if (para.startsWith('### ')) {
      elements.push(/*#__PURE__*/React.createElement('h3', {
        key: idx,
        className: 'text-base font-semibold mb-1 mt-2 first:mt-0'
      }, para.substring(4)));
      return;
    }

    // Lists
    if (para.match(/^[\*\-\+]\s/)) {
      var items = para.split('\n').filter(function (line) {
        return line.match(/^[\*\-\+]\s/);
      });
      elements.push(/*#__PURE__*/React.createElement('ul', {
        key: idx,
        className: 'list-disc list-inside my-2 space-y-1'
      }, items.map(function (item, itemIdx) {
        return /*#__PURE__*/React.createElement('li', {
          key: itemIdx,
          className: 'ml-2'
        }, renderInlineMarkdown(item.substring(2)));
      })));
      return;
    }
    if (para.match(/^\d+\.\s/)) {
      var _items = para.split('\n').filter(function (line) {
        return line.match(/^\d+\.\s/);
      });
      elements.push(/*#__PURE__*/React.createElement('ol', {
        key: idx,
        className: 'list-decimal list-inside my-2 space-y-1'
      }, _items.map(function (item, itemIdx) {
        return /*#__PURE__*/React.createElement('li', {
          key: itemIdx,
          className: 'ml-2'
        }, renderInlineMarkdown(item.replace(/^\d+\.\s/, '')));
      })));
      return;
    }

    // Regular paragraph with inline formatting
    var codeParts = [];
    var codeIdx = 0;
    var processedPara = para.replace(/`([^`]+)`/g, function (match, code) {
      var id = "code-".concat(idx, "-").concat(codeIdx++);
      codeParts.push(/*#__PURE__*/React.createElement('code', {
        key: id,
        className: 'bg-slate-200 text-slate-800 px-1 py-0.5 rounded text-xs font-mono'
      }, code));
      return "__CODE_".concat(id, "__");
    });

    // Bold and italic
    processedPara = processedPara.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    processedPara = processedPara.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    processedPara = processedPara.replace(/\*(.+?)\*/g, '<em>$1</em>');
    var parts = processedPara.split(/(__CODE_\w+__)/);
    var paraElements = parts.map(function (part, partIdx) {
      if (part.startsWith('__CODE_')) {
        var _codeId = part.replace(/__CODE_|__/g, '');
        return codeParts.find(function (c) {
          return c.key === _codeId;
        }) || part;
      }
      return /*#__PURE__*/React.createElement('span', {
        key: partIdx,
        dangerouslySetInnerHTML: {
          __html: part
        }
      });
    });
    elements.push(/*#__PURE__*/React.createElement('p', {
      key: idx,
      className: 'mb-2 last:mb-0'
    }, paraElements));
  });
  return elements;
};
var renderInlineMarkdown = function renderInlineMarkdown(text) {
  if (!text) return null;

  // Inline code
  var parts = [];
  var codeIdx = 0;
  var processedText = text.replace(/`([^`]+)`/g, function (match, code) {
    var id = "inline-code-".concat(codeIdx++);
    parts.push({
      type: 'code',
      id: id,
      content: code
    });
    return "__CODE_".concat(id, "__");
  });

  // Bold and italic
  processedText = processedText.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  processedText = processedText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  processedText = processedText.replace(/\*(.+?)\*/g, '<em>$1</em>');
  var elements = processedText.split(/(__CODE_\w+__)/).map(function (part, idx) {
    if (part.startsWith('__CODE_')) {
      var codeId = part.replace(/__CODE_|__/g, '');
      var codePart = parts.find(function (p) {
        return p.id === codeId;
      });
      if (codePart) {
        return /*#__PURE__*/React.createElement('code', {
          key: codeId,
          className: 'bg-slate-200 text-slate-800 px-1 py-0.5 rounded text-xs font-mono'
        }, codePart.content);
      }
    }
    return /*#__PURE__*/React.createElement('span', {
      key: idx,
      dangerouslySetInnerHTML: {
        __html: part
      }
    });
  });
  return elements;
};

// Calculate Bezier curve path
var getEdgePath = function getEdgePath(sourceX, sourceY, targetX, targetY) {
  var deltaX = Math.abs(targetX - sourceX);
  var controlPointOffset = Math.max(deltaX * 0.5, 50);
  return "M ".concat(sourceX, " ").concat(sourceY, " C ").concat(sourceX + controlPointOffset, " ").concat(sourceY, ", ").concat(targetX - controlPointOffset, " ").concat(targetY, ", ").concat(targetX, " ").concat(targetY);
};

// Check if all nodes are connected (reachable from each other)
var isGraphConnected = function isGraphConnected(nodes, edges) {
  if (nodes.length === 0) return true;
  if (nodes.length === 1) return true;

  // Build adjacency list (undirected for connectivity check)
  var adjList = {};
  nodes.forEach(function (node) {
    adjList[node.id] = [];
  });
  edges.forEach(function (edge) {
    adjList[edge.source].push(edge.target);
    adjList[edge.target].push(edge.source); // Make it undirected for connectivity
  });

  // BFS to check connectivity
  var visited = new Set();
  var queue = [nodes[0].id];
  visited.add(nodes[0].id);
  while (queue.length > 0) {
    var current = queue.shift();
    adjList[current].forEach(function (neighbor) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    });
  }
  return visited.size === nodes.length;
};

// Find root nodes (nodes with no incoming edges)
var findRootNodes = function findRootNodes(nodes, edges) {
  var hasIncomingEdge = new Set();
  edges.forEach(function (edge) {
    hasIncomingEdge.add(edge.target);
  });
  return nodes.filter(function (node) {
    return !hasIncomingEdge.has(node.id);
  });
};

// Validate graph: connected and has exactly one root node
var isGraphValid = function isGraphValid(nodes, edges) {
  if (nodes.length === 0) return true;
  var connected = isGraphConnected(nodes, edges);
  var rootNodes = findRootNodes(nodes, edges);
  return connected && rootNodes.length === 1;
};

/**
 * COMPONENT: Agent Selector (Dropdown/Modal)
 * Handles the tree navigation logic.
 */
var AgentSelector = function AgentSelector(_ref) {
  _ref.value;
    var onChange = _ref.onChange,
    onClose = _ref.onClose,
    agentTree = _ref.agentTree;
  var _useState = React.useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    path = _useState2[0],
    setPath = _useState2[1]; // Array of keys selected so far

  // Current level of the tree based on path
  var currentOptions = agentTree;
  path.forEach(function (key) {
    if (currentOptions[key]) currentOptions = currentOptions[key];
  });
  var isLeaf = Array.isArray(currentOptions);
  var handleSelect = function handleSelect(key) {
    if (isLeaf) {
      // It's an agent selection
      onChange([].concat(_toConsumableArray(path), [key]));
      onClose();
    } else {
      // Go deeper
      setPath([].concat(_toConsumableArray(path), [key]));
    }
  };
  var goBack = function goBack() {
    setPath(path.slice(0, -1));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "absolute top-full left-0 mt-[8px] bg-white rounded-[8px] shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-100",
    style: {
      width: '256px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-[8px] bg-slate-50 border-b border-slate-200 flex items-center justify-between"
  }, path.length > 0 ? /*#__PURE__*/React.createElement("button", {
    onClick: goBack,
    className: "text-[12px] font-medium text-blue-500 hover:text-blue-600 flex items-center"
  }, "\u2190 Back") : /*#__PURE__*/React.createElement("span", {
    className: "text-[12px] font-semibold text-slate-500 uppercase tracking-wider"
  }, "Select Source"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "text-slate-400 hover:text-red-500"
  }, /*#__PURE__*/React.createElement(X, {
    size: 14
  }))), /*#__PURE__*/React.createElement("div", {
    className: "max-h-[240px] overflow-y-auto p-[4px] bg-white text-slate-900"
  }, isLeaf ? currentOptions.map(function (agent) {
    return /*#__PURE__*/React.createElement("button", {
      key: agent,
      onClick: function onClick() {
        return handleSelect(agent);
      },
      className: "w-full text-left px-[12px] py-[8px] text-[14px] text-slate-700 hover:bg-blue-50 rounded flex items-center gap-[8px]"
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-[8px] h-[8px] rounded-full bg-green-500"
    }), agent);
  }) : Object.keys(currentOptions).map(function (key) {
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      onClick: function onClick() {
        return handleSelect(key);
      },
      className: "w-full text-left px-[12px] py-[8px] text-[14px] text-slate-700 hover:bg-slate-100 rounded flex items-center justify-between group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-[8px]"
    }, path.length === 0 ? key === 'Shared' ? '🌍' : '🔒' : '📁', /*#__PURE__*/React.createElement("span", null, key)), /*#__PURE__*/React.createElement(ChevronRight, {
      size: 14,
      className: "text-slate-400 group-hover:text-slate-600"
    }));
  }), !isLeaf && Object.keys(currentOptions).length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "p-2 text-slate-400 text-xs text-center italic"
  }, "No items found")));
};

/**
 * COMPONENT: Speech Bubble
 * Displays markdown content in a speech bubble positioned near the active node
 */
var SpeechBubble = function SpeechBubble(_ref2) {
  var activeNode = _ref2.activeNode,
    nodes = _ref2.nodes,
    nodeHeights = _ref2.nodeHeights,
    currentMessage = _ref2.currentMessage;
    _ref2.pan;
    _ref2.containerRef;
  var _useState3 = React.useState('hidden'),
    _useState4 = _slicedToArray(_useState3, 2),
    animationState = _useState4[0],
    setAnimationState = _useState4[1]; // 'hidden', 'appearing', 'visible', 'disappearing'
  var _useState5 = React.useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    displayMessage = _useState6[0],
    setDisplayMessage = _useState6[1];
  var prevMessageRef = React.useRef(null);
  var bubbleRef = React.useRef(null);

  // Find the active node
  var activeNodeData = nodes.find(function (node) {
    return activeNode === node.data.agentPath.join('/');
  });
  React.useEffect(function () {
    var prevMessage = prevMessageRef.current;
    var hasMessage = !!currentMessage;
    var hadMessage = !!prevMessage;
    if (!hasMessage && !hadMessage) {
      // No message before or after
      setAnimationState('hidden');
      setDisplayMessage(null);
    } else if (!hasMessage && hadMessage) {
      // Message disappeared - animate out
      setAnimationState('disappearing');
      // Force animation to start by triggering reflow
      requestAnimationFrame(function () {
        if (bubbleRef.current) {
          bubbleRef.current.offsetHeight; // Force reflow
        }
      });
      // After animation completes, hide
      setTimeout(function () {
        setAnimationState('hidden');
        setDisplayMessage(null);
      }, 300); // Match animation duration
    } else if (hasMessage && !hadMessage) {
      // Message appeared - animate in
      setDisplayMessage(currentMessage);
      setAnimationState('appearing');
      // After animation completes, set to visible
      setTimeout(function () {
        setAnimationState('visible');
      }, 400); // Match animation duration
    } else if (hasMessage && hadMessage && prevMessage !== currentMessage) {
      // Message replaced - no animation, just update
      setDisplayMessage(currentMessage);
      setAnimationState('visible');
    } else if (hasMessage && hadMessage && prevMessage === currentMessage) {
      // Same message - keep visible
      setDisplayMessage(currentMessage);
      if (animationState === 'hidden') {
        setAnimationState('visible');
      }
    }
    prevMessageRef.current = currentMessage;
  }, [currentMessage, activeNode]);
  if (!activeNode || !displayMessage || animationState === 'hidden') return null;
  if (!activeNodeData) return null;
  var nodeHeight = nodeHeights[activeNodeData.id] || 88;
  var bubbleWidth = 640; // Doubled from 320
  var bubbleHeight = 280;
  var nodeWidth = 256; // Node width is 256px

  // Position bubble below the active node, aligned with left edge
  var bubbleX = activeNodeData.x; // Align left edges
  var bubbleY = activeNodeData.y + nodeHeight + 20; // Below node with gap

  // Triangle position: middle of node (128px from node's left edge, which is bubble's left edge)
  var triangleLeft = nodeWidth / 2; // 128px - middle of node

  // Calculate scale origin from node center (for shrink animation)
  var nodeCenterX = activeNodeData.x + nodeWidth / 2;
  var nodeCenterY = activeNodeData.y + nodeHeight / 2;
  // Transform origin relative to the bubble element (0-100%)
  var originX = (nodeCenterX - bubbleX) / bubbleWidth * 100;
  var originY = (nodeCenterY - bubbleY) / bubbleHeight * 100;

  // Get animation style based on state
  var animationStyle = {};
  var baseTransform = "translate(".concat(bubbleX, "px, ").concat(bubbleY, "px)");
  if (animationState === 'appearing') {
    animationStyle = {
      animation: "popOut-".concat(bubbleX, "-").concat(bubbleY, " 0.4s ease-out forwards")
    };
  } else if (animationState === 'disappearing') {
    animationStyle = {
      animation: "shrinkIn-".concat(bubbleX, "-").concat(bubbleY, "-").concat(nodeCenterX, "-").concat(nodeCenterY, " 0.3s ease-in forwards")
    };
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, "\n                @keyframes popOut-".concat(bubbleX, "-").concat(bubbleY, " {\n                    0% {\n                        transform: translate(").concat(bubbleX, "px, ").concat(bubbleY, "px) scale(0.3);\n                        opacity: 0;\n                    }\n                    80% {\n                        transform: translate(").concat(bubbleX, "px, ").concat(bubbleY, "px) scale(1.05);\n                        opacity: 1;\n                    }\n                    100% {\n                        transform: translate(").concat(bubbleX, "px, ").concat(bubbleY, "px) scale(1);\n                        opacity: 1;\n                    }\n                }\n                @keyframes shrinkIn-").concat(bubbleX, "-").concat(bubbleY, "-").concat(nodeCenterX, "-").concat(nodeCenterY, " {\n                    from {\n                        transform: translate(").concat(bubbleX, "px, ").concat(bubbleY, "px) scale(1);\n                        opacity: 1;\n                    }\n                    to {\n                        transform: translate(").concat(nodeCenterX, "px, ").concat(nodeCenterY, "px) scale(0);\n                        opacity: 0;\n                    }\n                }\n            ")), /*#__PURE__*/React.createElement("div", {
    ref: bubbleRef,
    className: "absolute pointer-events-auto z-20",
    style: _objectSpread2(_objectSpread2({}, animationState === 'visible' && !animationStyle.animation ? {
      transform: baseTransform
    } : {}), {}, {
      transformOrigin: "".concat(originX, "% ").concat(originY, "%"),
      width: "".concat(bubbleWidth, "px"),
      maxHeight: "".concat(bubbleHeight, "px")
    }, animationStyle)
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute z-10",
    style: {
      left: "".concat(triangleLeft, "px"),
      transform: 'translateX(-50%)',
      top: '-12px',
      width: 0,
      height: 0,
      borderLeft: '12px solid transparent',
      borderRight: '12px solid transparent',
      borderBottom: '12px solid rgba(255, 255, 255, 0.95)',
      filter: 'drop-shadow(0 -2px 4px rgba(0, 0, 0, 0.1))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-white rounded-2xl shadow-xl border-slate-300 overflow-hidden",
    style: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderWidth: '3px',
      maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3))',
      WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 overflow-y-auto text-slate-800 text-sm leading-relaxed",
    style: {
      maxHeight: "".concat(bubbleHeight, "px")
    }
  }, renderMarkdown(displayMessage)))));
};

/**
 * MAIN APP COMPONENT
 */
function TeamBuilder(_ref3) {
  var _ref3$agentTree = _ref3.agentTree,
    agentTree = _ref3$agentTree === void 0 ? AGENT_TREE : _ref3$agentTree,
    activeNode = _ref3.activeNode,
    _ref3$initialNodes = _ref3.initialNodes,
    initialNodes = _ref3$initialNodes === void 0 ? [] : _ref3$initialNodes,
    _ref3$initialEdges = _ref3.initialEdges,
    initialEdges = _ref3$initialEdges === void 0 ? [] : _ref3$initialEdges,
    handleSave = _ref3.handleSave,
    handleView = _ref3.handleView,
    handleEdit = _ref3.handleEdit,
    _ref3$initialEditable = _ref3.initialEditable,
    initialEditable = _ref3$initialEditable === void 0 ? false : _ref3$initialEditable,
    currentMessage = _ref3.currentMessage;
  var _useState7 = React.useState(initialNodes),
    _useState8 = _slicedToArray(_useState7, 2),
    nodes = _useState8[0],
    setNodes = _useState8[1];
  var _useState9 = React.useState(initialEdges),
    _useState0 = _slicedToArray(_useState9, 2),
    edges = _useState0[0],
    setEdges = _useState0[1];

  // Mode State
  var _useState1 = React.useState(initialEditable),
    _useState10 = _slicedToArray(_useState1, 2),
    isEditing = _useState10[0],
    setIsEditing = _useState10[1];
  var _useState11 = React.useState({
      nodes: initialNodes,
      edges: initialEdges
    }),
    _useState12 = _slicedToArray(_useState11, 2),
    restorePoint = _useState12[0],
    setRestorePoint = _useState12[1];
  var _useState13 = React.useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    confirmResetOpen = _useState14[0],
    setConfirmResetOpen = _useState14[1];
  var _useState15 = React.useState(true),
    _useState16 = _slicedToArray(_useState15, 2),
    isFollowingActive = _useState16[0],
    setIsFollowingActive = _useState16[1];

  // Interaction State
  var _useState17 = React.useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    draggingNode = _useState18[0],
    setDraggingNode = _useState18[1];
  var _useState19 = React.useState(null),
    _useState20 = _slicedToArray(_useState19, 2),
    connectingSource = _useState20[0],
    setConnectingSource = _useState20[1];
  var _useState21 = React.useState({
      x: 0,
      y: 0
    }),
    _useState22 = _slicedToArray(_useState21, 2),
    mousePos = _useState22[0],
    setMousePos = _useState22[1];
  // Initialize pan from sessionStorage to persist across re-renders
  var _useState23 = React.useState(function () {
      try {
        var saved = sessionStorage.getItem('teambuilder-pan');
        return saved ? JSON.parse(saved) : {
          x: 0,
          y: 0
        };
      } catch (_unused) {
        return {
          x: 0,
          y: 0
        };
      }
    }),
    _useState24 = _slicedToArray(_useState23, 2),
    pan = _useState24[0],
    setPan = _useState24[1];
  var _useState25 = React.useState(false),
    _useState26 = _slicedToArray(_useState25, 2),
    isPanning = _useState26[0],
    setIsPanning = _useState26[1];
  var _useState27 = React.useState({
      x: 0,
      y: 0
    }),
    _useState28 = _slicedToArray(_useState27, 2),
    panStart = _useState28[0],
    setPanStart = _useState28[1];

  // UI State
  var _useState29 = React.useState(null),
    _useState30 = _slicedToArray(_useState29, 2),
    openSelectorId = _useState30[0],
    setOpenSelectorId = _useState30[1];
  var _useState31 = React.useState({}),
    _useState32 = _slicedToArray(_useState31, 2),
    nodeHeights = _useState32[0],
    setNodeHeights = _useState32[1];
  var containerRef = React.useRef(null);
  var nodeRefs = React.useRef({});
  var animationFrameRef = React.useRef(null);
  var panRef = React.useRef(pan);
  var isAutoPanningRef = React.useRef(false);

  // Keep panRef in sync with pan state
  React.useEffect(function () {
    panRef.current = pan;
  }, [pan]);

  // --- Pan to Active Node ---
  var panToActiveNode = React.useCallback(function () {
    if (!activeNode || !containerRef.current) return;
    var activeNodeData = nodes.find(function (node) {
      return activeNode === node.data.agentPath.join('/');
    });
    if (!activeNodeData) return;
    var nodeHeight = nodeHeights[activeNodeData.id] || 88;
    var nodeWidth = 256;
    var containerWidth = containerRef.current.clientWidth;
    var containerHeight = containerRef.current.clientHeight;

    // Calculate target position: node should be in upper-middle area
    // Leave space below for the speech bubble
    var targetNodeCenterX = containerWidth / 2;
    var targetNodeCenterY = containerHeight * 0.3; // Position at 30% from top instead of 50%

    // Calculate required pan to move node center to target position
    var targetPanX = targetNodeCenterX - (activeNodeData.x + nodeWidth / 2);
    var targetPanY = targetNodeCenterY - (activeNodeData.y + nodeHeight / 2);

    // Smooth animation - use ref to get current pan value
    var startPan = _objectSpread2({}, panRef.current);
    var startTime = performance.now();
    var duration = 600; // 600ms animation

    // Mark that we're doing an automatic pan
    isAutoPanningRef.current = true;
    var _animate = function animate(currentTime) {
      var elapsed = currentTime - startTime;
      var progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out cubic)
      var eased = 1 - Math.pow(1 - progress, 3);
      var newPan = {
        x: startPan.x + (targetPanX - startPan.x) * eased,
        y: startPan.y + (targetPanY - startPan.y) * eased
      };
      setPan(newPan);
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(_animate);
      } else {
        // Animation complete, clear auto-panning flag
        isAutoPanningRef.current = false;
      }
    };
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(_animate);
  }, [activeNode, nodes, nodeHeights]);

  // Cleanup animation frame on unmount
  React.useEffect(function () {
    return function () {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Auto-follow active node when follow mode is enabled
  React.useEffect(function () {
    if (isFollowingActive && activeNode) {
      panToActiveNode();
    }
  }, [activeNode, isFollowingActive, panToActiveNode]);

  // Disable follow mode when entering edit mode
  React.useEffect(function () {
    if (isEditing) {
      setIsFollowingActive(false);
    }
  }, [isEditing]);

  // --- Mode Handlers ---
  var handleEditClick = function handleEditClick() {
    // Save restore point when entering edit mode
    setRestorePoint({
      nodes: _toConsumableArray(nodes),
      edges: _toConsumableArray(edges)
    });
    setIsEditing(true);
  };
  var handleCancelClick = function handleCancelClick() {
    var hasChanges = JSON.stringify(nodes) !== JSON.stringify(restorePoint.nodes) || JSON.stringify(edges) !== JSON.stringify(restorePoint.edges);
    if (hasChanges) {
      setConfirmResetOpen(true);
    } else {
      setIsEditing(false);
    }
  };
  var handleConfirmReset = function handleConfirmReset() {
    setNodes(restorePoint.nodes);
    setEdges(restorePoint.edges);
    setIsEditing(false);
    setConfirmResetOpen(false);
  };
  var handleSaveClick = React.useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var rootNodes, rootNodeId;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          if (!handleSave) {
            _context.n = 1;
            break;
          }
          rootNodes = findRootNodes(nodes, edges);
          rootNodeId = rootNodes.length === 1 ? rootNodes[0].id : null;
          _context.n = 1;
          return handleSave({
            nodes: nodes,
            edges: edges,
            rootNodeId: rootNodeId
          });
        case 1:
          setRestorePoint({
            nodes: _toConsumableArray(nodes),
            edges: _toConsumableArray(edges)
          });
          setIsEditing(false);
        case 2:
          return _context.a(2);
      }
    }, _callee);
  })), [edges, handleSave, nodes]);
  React.useEffect(function () {
    if (!confirmResetOpen) return;
    var handleKeyDown = function handleKeyDown(event) {
      if (event.key === 'Escape') setConfirmResetOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return function () {
      return window.removeEventListener('keydown', handleKeyDown);
    };
  }, [confirmResetOpen]);

  // Persist pan position to sessionStorage
  React.useEffect(function () {
    try {
      sessionStorage.setItem('teambuilder-pan', JSON.stringify(pan));
    } catch (_unused2) {
      // Ignore storage errors
    }
  }, [pan]);

  // Measure node heights
  React.useEffect(function () {
    var heights = {};
    nodes.forEach(function (node) {
      var nodeElement = nodeRefs.current[node.id];
      if (nodeElement) {
        heights[node.id] = nodeElement.offsetHeight;
      }
    });
    setNodeHeights(heights);
  }, [nodes]);

  // --- Handlers ---

  var handleMouseDown = function handleMouseDown(e) {
    if (e.button !== 0) return;
    if (e.target.closest('[data-node]')) return;
    setIsPanning(true);
    setPanStart({
      x: e.clientX - pan.x,
      y: e.clientY - pan.y
    });
  };
  var handleMouseMove = function handleMouseMove(e) {
    var containerRect = containerRef.current.getBoundingClientRect();
    var x = e.clientX - containerRect.left;
    var y = e.clientY - containerRect.top;

    // Adjust mouse pos for logic (subtracting pan not needed for absolute tracking, but needed for relative calc)
    var worldX = x - pan.x;
    var worldY = y - pan.y;
    setMousePos({
      x: worldX,
      y: worldY
    });
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
      // Disable follow mode when user manually pans (but not during automatic panning)
      if (isFollowingActive && !isAutoPanningRef.current) {
        setIsFollowingActive(false);
      }
      return;
    }
    if (draggingNode) {
      setNodes(function (nds) {
        return nds.map(function (n) {
          if (n.id === draggingNode.id) {
            return _objectSpread2(_objectSpread2({}, n), {}, {
              x: worldX - draggingNode.offsetX,
              y: worldY - draggingNode.offsetY
            });
          }
          return n;
        });
      });
    }
  };
  var handleMouseUp = function handleMouseUp() {
    setDraggingNode(null);
    setConnectingSource(null);
    setIsPanning(false);
  };
  var onNodeDragStart = function onNodeDragStart(e, node) {
    if (!isEditing) return;
    e.stopPropagation();
    // Only drag if not clicking a control
    if (e.target.closest('button') || e.target.closest('.nodrag')) return;
    setDraggingNode({
      id: node.id,
      offsetX: mousePos.x - node.x,
      offsetY: mousePos.y - node.y
    });
  };
  var onHandleMouseDown = function onHandleMouseDown(e, nodeId, type) {
    if (!isEditing) return;
    e.stopPropagation();
    if (type === 'source') {
      var node = nodes.find(function (n) {
        return n.id === nodeId;
      });
      var nodeHeight = nodeHeights[nodeId] || 88; // fallback to approximate height
      setConnectingSource({
        nodeId: nodeId,
        x: node.x + 256,
        // Right edge of node
        y: node.y + nodeHeight / 2 // Actual center Y
      });
    }
  };
  var onHandleMouseUp = function onHandleMouseUp(e, nodeId, type) {
    e.stopPropagation();
    if (connectingSource && type === 'target' && connectingSource.nodeId !== nodeId) {
      // Create Edge
      var newEdge = {
        id: "e".concat(connectingSource.nodeId, "-").concat(nodeId, "-").concat(Date.now()),
        source: connectingSource.nodeId,
        target: nodeId
      };

      // Check duplicate
      var exists = edges.find(function (e) {
        return e.source === newEdge.source && e.target === newEdge.target;
      });
      if (!exists) {
        setEdges([].concat(_toConsumableArray(edges), [newEdge]));
      }
    }
    setConnectingSource(null);
  };
  var deleteNode = function deleteNode(id) {
    setNodes(nodes.filter(function (n) {
      return n.id !== id;
    }));
    setEdges(edges.filter(function (e) {
      return e.source !== id && e.target !== id;
    }));
    delete nodeRefs.current[id];
  };
  var deleteEdge = function deleteEdge(id) {
    if (!isEditing) return;
    setEdges(edges.filter(function (e) {
      return e.id !== id;
    }));
  };
  var updateAgent = function updateAgent(nodeId, newPath) {
    setNodes(nodes.map(function (n) {
      return n.id === nodeId ? _objectSpread2(_objectSpread2({}, n), {}, {
        data: _objectSpread2(_objectSpread2({}, n.data), {}, {
          agentPath: newPath
        })
      }) : n;
    }));
  };
  var addNode = function addNode() {
    var _containerRef$current, _containerRef$current2;
    var id = generateId();
    // Calculate center of screen adjusted for pan
    var centerX = -pan.x + (((_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.clientWidth) || 800) / 2 - 100;
    var centerY = -pan.y + (((_containerRef$current2 = containerRef.current) === null || _containerRef$current2 === void 0 ? void 0 : _containerRef$current2.clientHeight) || 600) / 2 - 50;
    setNodes([].concat(_toConsumableArray(nodes), [{
      id: id,
      x: centerX,
      y: centerY,
      data: {
        label: 'New Node',
        agentPath: []
      }
    }]));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col h-full w-full bg-slate-100 text-slate-900 font-sans overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "border-b border-slate-200 bg-white flex items-center px-[16px] justify-between z-10 shadow-sm",
    style: {
      height: '56px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-[8px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-[8px] bg-indigo-600 rounded text-white"
  }, /*#__PURE__*/React.createElement(Users, {
    size: 18
  })), /*#__PURE__*/React.createElement("h1", {
    className: "font-bold text-[18px] hidden sm:block"
  }, "Team Builder")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-[12px]"
  }, !isEditing && (activeNode ? /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setIsFollowingActive(!isFollowingActive);
    },
    className: "flex items-center gap-[8px] px-[16px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors shadow-sm ".concat(isFollowingActive ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white')
  }, isFollowingActive ? /*#__PURE__*/React.createElement(Check, {
    size: 16
  }) : /*#__PURE__*/React.createElement(Play, {
    size: 16
  }), "Follow Active Agent") : /*#__PURE__*/React.createElement("div", {
    className: "text-[12px] text-slate-500 hidden md:block"
  }, "View Only Mode")), !isEditing ? /*#__PURE__*/React.createElement("button", {
    onClick: handleEditClick,
    className: "flex items-center gap-[8px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-[16px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors shadow-sm"
  }, /*#__PURE__*/React.createElement(Pencil, {
    size: 16
  }), " Edit") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    onClick: handleCancelClick,
    className: "flex items-center gap-[8px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-[16px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors shadow-sm"
  }, /*#__PURE__*/React.createElement(X, {
    size: 16
  }), " Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: handleSaveClick,
    className: "flex items-center gap-[8px] bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-[16px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors shadow-sm"
  }, /*#__PURE__*/React.createElement(Save, {
    size: 16
  }), " Save"), /*#__PURE__*/React.createElement("button", {
    onClick: addNode,
    className: "flex items-center gap-[8px] bg-indigo-600 hover:bg-indigo-700 text-white px-[16px] py-[8px] rounded-[6px] text-[14px] font-medium transition-colors shadow-sm",
    style: {
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }), " Add Node")))), /*#__PURE__*/React.createElement("div", {
    ref: containerRef,
    className: "flex-1 relative overflow-hidden bg-grid-slate-200/[0.5]",
    style: {
      cursor: isPanning ? 'grabbing' : 'grab',
      backgroundSize: '40px 40px'
    },
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseUp
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      transform: "translate(".concat(pan.x, "px, ").concat(pan.y, "px)"),
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none' // Let events pass through wrapper
    }
  }, /*#__PURE__*/React.createElement("svg", {
    className: "absolute top-0 left-0 overflow-visible w-full h-full pointer-events-none z-0"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("marker", {
    id: "arrowhead",
    markerWidth: "10",
    markerHeight: "7",
    refX: "9",
    refY: "3.5",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "0 0, 10 3.5, 0 7",
    fill: "#64748b"
  })), /*#__PURE__*/React.createElement("marker", {
    id: "arrowhead-active",
    markerWidth: "10",
    markerHeight: "7",
    refX: "9",
    refY: "3.5",
    orient: "auto"
  }, /*#__PURE__*/React.createElement("polygon", {
    points: "0 0, 10 3.5, 0 7",
    fill: "#6366f1"
  }))), edges.map(function (edge) {
    var src = nodes.find(function (n) {
      return n.id === edge.source;
    });
    var trg = nodes.find(function (n) {
      return n.id === edge.target;
    });
    if (!src || !trg) return null;

    // Calculate handle positions based on actual node heights
    var srcHeight = nodeHeights[edge.source] || 88; // fallback to approximate height
    var trgHeight = nodeHeights[edge.target] || 88;
    var sx = src.x + 256; // Width of node is w-64 (256px)
    var sy = src.y + srcHeight / 2; // Actual center Y
    var tx = trg.x;
    var ty = trg.y + trgHeight / 2; // Actual center Y

    var path = getEdgePath(sx, sy, tx, ty);
    return /*#__PURE__*/React.createElement("g", {
      key: edge.id,
      className: "pointer-events-auto group"
    }, /*#__PURE__*/React.createElement("path", {
      d: path,
      strokeWidth: "15",
      stroke: "transparent",
      fill: "none",
      className: isEditing ? "cursor-pointer" : "",
      onClick: function onClick() {
        return deleteEdge(edge.id);
      } // Click fat hidden path to delete
    }), /*#__PURE__*/React.createElement("path", {
      d: path,
      stroke: "#64748b",
      strokeWidth: "2",
      fill: "none",
      markerEnd: "url(#arrowhead)",
      className: "group-hover:stroke-red-500 transition-colors"
    }));
  }), connectingSource && /*#__PURE__*/React.createElement("path", {
    d: getEdgePath(connectingSource.x, connectingSource.y, mousePos.x, mousePos.y),
    stroke: "#6366f1",
    strokeWidth: "2",
    fill: "none",
    strokeDasharray: "5,5"
  })), /*#__PURE__*/React.createElement(SpeechBubble, {
    activeNode: activeNode,
    nodes: nodes,
    nodeHeights: nodeHeights,
    currentMessage: currentMessage,
    pan: pan,
    containerRef: containerRef
  }), /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-auto w-full h-full"
  }, nodes.map(function (node) {
    var isActive = activeNode === node.data.agentPath.join('/');
    var agentName = node.data.agentPath.length > 0 ? node.data.agentPath[node.data.agentPath.length - 1] : 'Select Agent...';
    var breadcrumbs = node.data.agentPath.slice(0, -1).join(' > ');

    // Check if this is a root node (only show icon if graph is valid)
    var rootNodes = findRootNodes(nodes, edges);
    var graphValid = isGraphValid(nodes, edges);
    var isRootNode = graphValid && rootNodes.length === 1 && rootNodes[0].id === node.id;
    return /*#__PURE__*/React.createElement("div", {
      ref: function ref(el) {
        return nodeRefs.current[node.id] = el;
      },
      "data-node": "true",
      key: node.id,
      onMouseDown: function onMouseDown(e) {
        return onNodeDragStart(e, node);
      },
      style: {
        transform: "translate(".concat(node.x, "px, ").concat(node.y, "px)"),
        width: '256px',
        height: 'fit-content',
        boxSizing: 'border-box',
        fontSize: '14px',
        lineHeight: '1.5',
        fontFamily: 'sans-serif'
      },
      className: "absolute bg-white rounded-[12px] shadow-lg border-2 transition-shadow duration-200 group flex flex-col z-10\n                                        ".concat(isActive ? 'border-green-500 shadow-green-500/30 ring-1 ring-green-500' : 'border-blue-500 hover:border-blue-600', "\n                                    ")
    }, /*#__PURE__*/React.createElement("div", {
      className: "rounded-t-[12px] w-full ".concat(isActive ? 'bg-green-500' : 'bg-slate-100'),
      style: {
        height: '8px'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col",
      style: {
        padding: '16px',
        gap: '12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex flex-col"
    }, breadcrumbs && /*#__PURE__*/React.createElement("span", {
      className: "text-slate-400 truncate max-w-[150px]",
      title: breadcrumbs,
      style: {
        fontSize: '10px'
      }
    }, breadcrumbs)), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-[4px]"
    }, !isEditing ? handleView && node.data.agentPath.length > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleView(node.data.agentPath.join('/'));
      },
      className: "p-[6px] rounded-[6px] text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors",
      title: "View Agent"
    }, /*#__PURE__*/React.createElement(Eye, {
      size: 16
    })) : handleEdit && node.data.agentPath.length > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return handleEdit(node.data.agentPath.join('/'));
      },
      className: "p-[6px] rounded-[6px] text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors",
      title: "Edit Agent"
    }, /*#__PURE__*/React.createElement(SquarePen, {
      size: 16
    })), isRootNode && /*#__PURE__*/React.createElement("div", {
      className: "p-[6px] rounded-[6px] transition-all text-indigo-600 bg-indigo-50",
      title: "Root Node"
    }, /*#__PURE__*/React.createElement(House, {
      size: 18
    })), isActive && /*#__PURE__*/React.createElement("div", {
      className: "p-[6px] rounded-[6px] transition-all text-green-600 bg-green-50",
      title: "Active Node"
    }, /*#__PURE__*/React.createElement(Settings, {
      size: 18,
      className: "animate-spin"
    })), isEditing && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return deleteNode(node.id);
      },
      className: "p-[6px] rounded-[6px] text-slate-300 hover:text-red-600 hover:bg-red-50 transition-colors"
    }, /*#__PURE__*/React.createElement(Trash2, {
      size: 16
    })))), /*#__PURE__*/React.createElement("div", {
      className: "relative nodrag"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setOpenSelectorId(openSelectorId === node.id ? null : node.id);
      },
      className: "w-full flex items-center justify-between px-[12px] py-[8px] bg-slate-50 border border-slate-200 rounded-[6px] text-[14px] text-slate-600 hover:bg-slate-100 transition-colors"
    }, /*#__PURE__*/React.createElement("span", null, agentName), /*#__PURE__*/React.createElement(ChevronDown, {
      size: 14
    })), openSelectorId === node.id && isEditing && /*#__PURE__*/React.createElement(AgentSelector, {
      value: node.data.agentPath,
      onChange: function onChange(newPath) {
        return updateAgent(node.id, newPath);
      },
      onClose: function onClose() {
        return setOpenSelectorId(null);
      },
      agentTree: agentTree
    }))), isEditing && /*#__PURE__*/React.createElement("div", {
      className: "absolute group-hover:scale-110 transition-transform pointer-events-none",
      style: {
        position: 'absolute',
        left: '-12px',
        right: 'auto',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-[12px] h-[12px] bg-white border-2 border-slate-400 rounded-full hover:border-indigo-500 hover:bg-indigo-50 cursor-crosshair pointer-events-auto",
      onMouseUp: function onMouseUp(e) {
        return onHandleMouseUp(e, node.id, 'target');
      }
    })), isEditing && /*#__PURE__*/React.createElement("div", {
      className: "absolute group-hover:scale-110 transition-transform pointer-events-none",
      style: {
        position: 'absolute',
        left: 'auto',
        right: '-12px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '24px',
        height: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "w-[12px] h-[12px] bg-white border-2 border-slate-400 rounded-full hover:border-indigo-500 hover:bg-indigo-50 cursor-crosshair pointer-events-auto",
      onMouseDown: function onMouseDown(e) {
        return onHandleMouseDown(e, node.id, 'source');
      }
    })));
  })))), /*#__PURE__*/React.createElement("div", {
    className: "h-8 bg-white border-t border-slate-200 flex items-center px-4 text-xs text-slate-400 justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "Team: ", nodes.length, " Agents, ", edges.length, " Connections"), nodes.length > 0 && !isGraphValid(nodes, edges) && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1 text-amber-600"
  }, /*#__PURE__*/React.createElement(TriangleAlert, {
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, !isGraphConnected(nodes, edges) ? 'Warning: Not all nodes are connected' : findRootNodes(nodes, edges).length !== 1 ? "Warning: Graph must have exactly 1 root node (found ".concat(findRootNodes(nodes, edges).length, ")") : 'Warning: Invalid graph structure'))), /*#__PURE__*/React.createElement("div", null, "Active: ", activeNode || 'None')), confirmResetOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-slate-900/40 backdrop-blur-sm",
    onClick: function onClick() {
      return setConfirmResetOpen(false);
    }
  }), /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "reset-dialog-title",
    className: "relative w-[92%] max-w-[420px] rounded-[12px] bg-white shadow-2xl border border-slate-200 p-[20px] animate-in fade-in zoom-in-95 duration-150"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start gap-[12px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex h-[36px] w-[36px] items-center justify-center rounded-full bg-red-50 text-red-600"
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "reset-dialog-title",
    className: "text-[16px] font-semibold text-slate-900"
  }, "Discard unsaved changes?"), /*#__PURE__*/React.createElement("p", {
    className: "mt-[6px] text-[13px] text-slate-600"
  }, "This will reset the canvas back to your last saved state."))), /*#__PURE__*/React.createElement("div", {
    className: "mt-[18px] flex items-center justify-end gap-[8px]"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setConfirmResetOpen(false);
    },
    className: "px-[12px] py-[8px] text-[13px] font-medium text-slate-700 hover:text-slate-900"
  }, "Keep Editing"), /*#__PURE__*/React.createElement("button", {
    onClick: handleConfirmReset,
    className: "px-[14px] py-[8px] rounded-[6px] bg-red-600 text-white text-[13px] font-medium hover:bg-red-700 transition-colors"
  }, "Reset Changes")))));
}
var TeamBuilder$1 = (function (_ref5) {
  var withBindings = _ref5.withBindings;
  return withBindings(TeamBuilder);
});

/**
 * See the docs for more info on API versions:
 * https://docs.wsq.io/topics/custom-javascript-components/#api
 */
var index = {
  v1: {
    TeamBuilder: TeamBuilder$1
  }
};

export { index as default };
