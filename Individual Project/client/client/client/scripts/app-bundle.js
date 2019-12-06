define('app',["exports", "aurelia-auth"], function (_exports, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.App = void 0;

  var App =
  /*#__PURE__*/
  function () {
    function App() {}

    var _proto = App.prototype;

    _proto.configureRouter = function configureRouter(config, router) {
      this.router = router; // config.addPipelineStep('authorize', AuthorizeStep); 

      config.title = 'Things ToDo';
      config.map([{
        route: ['', 'home'],
        name: 'home',
        moduleId: 'modules/home',
        title: 'Home',
        auth: false
      }, {
        route: 'users',
        name: 'users',
        moduleId: 'modules/users',
        title: 'Users',
        auth: true
      }, {
        route: 'todos',
        name: 'todos',
        moduleId: 'modules/todos',
        title: 'Todos',
        auth: true
      }]);
    };

    return App;
  }();

  _exports.App = App;
});;
define('text!app.html',[],function(){return "<template>\n  <nav-bar></nav-bar>\n  <router-view></router-view>\n</template>\n";});;
define('auth-config',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var authConfig = {
    baseUrl: "http://localhost:5000/api",
    loginUrl: '/users/login',
    tokenName: 'token',
    authHeader: 'Authorization',
    authToken: '',
    logoutRedirect: '#/home'
  };
  var _default = authConfig;
  _exports.default = _default;
});;
define('environment',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.default = void 0;
  var _default = {
    debug: true,
    testing: true
  };
  _exports.default = _default;
});;
define('main',["exports", "regenerator-runtime/runtime", "./environment", "./auth-config"], function (_exports, _runtime, _environment, _authConfig) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;
  _environment = _interopRequireDefault(_environment);
  _authConfig = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // regenerator-runtime is to support async/await syntax in ESNext.
  // If you don't use async/await, you can remove regenerator-runtime.
  // Promise.config({ warnings: { wForgottenReturn: false } });
  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig.default);
    }).feature('resources');
    aurelia.use.developmentLogging(_environment.default.debug ? 'debug' : 'warn');

    if (_environment.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});;
define('text!modules/components/editUser.html',[],function(){return "<template>\n        First Name: <input value.bind=\"user.fname\">\n        Last Name: <input value.bind=\"user.lname\">\n    Active: <input value.bind=\"user.active\">\n    Role: <input value.bind=\"user.role\">\n        Email: <input value.bind=\"user.email\">\n        Password: <input value.bind=\"user.password\">\n        <button click.trigger=\"save()\">Save</button>\n</template>";});;
define('text!modules/components/todosForm.html',[],function(){return "<template>\n        <form>\n                <div class=\"form-group\">\n                  <label for=\"todoInput\">Todo</label>\n                  <input value.bind=\"todo.selectedTodo.todo\" type=\"text\" class=\"form-control\" id=\"todoInput\"\n                    placeholder=\"Todo title\">\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"todoDetail\">Todo Detail</label>\n                  <textarea value.bind=\"todo.selectedTodo.detail\" class=\"form-control\" id=\"todoDetail\" rows=\"5\"></textarea>\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"todoStatus\">Status</label>\n                  <select value.bind=\"todo.selectedTodo.status\" class=\"form-control\" id=\"todoStatus\">\n                    <option repeat.for=\"status of statuses\" model.bind=\"status\">${status}</option>\n                  </select>\n                </div>\n                <div class=\"form-group\">\n                  <label for=\"todoStatus\">Due Date</label>\n                  <flat-picker controlid=\"startDate\" value.bind=\"todo.selectedTodo.dateDue\"></flat-picker>\n                </div>\n                <button class=\"btn btn-primary\" click.trigger=\"saveTodo()\">Save</button>\n                <button class=\"btn btn-primary\" click.trigger=\"cancel()\">Cancel</button>\n              </form>\n    </template>";});;
define('text!modules/components/todosTable.html',[],function(){return "<template>\n    <button class=\"btn btn-primary\" click.trigger=\"newTodo()\" style=\"margin-bottom:10px;\">Create Todo</button>\n    <table class=\"table\">\n        <thead>\n            <tr>\n                <th colspan=\"3\">\n                    <div class=\"checkbox leftMargin\"><label><input checked.bind=\"isCheckedCompleted\" type=\"checkbox\">\n                            Filter out Completed Todos</label></div>\n                </th>\n            </tr>\n            <tr>\n                <th scope=\"col\">Todo</th>\n                <th scope=\"col\">Status</th>\n                <th scope=\"col\">Due Date</th>\n                <th scope=\"col\"></th>\n            </tr>\n        </thead>\n        <tbody>\n            <tr repeat.for=\"todo of todo.todosArray | filterTodos:isCheckedCompleted\">\n                <td scope=\"row\" click.delegate=\"editTodo(todo)\">${todo.todo}</td>\n                <td><select change.delegate=\"updateTodo(todo)\" value.bind=\"todo.status\" class=\"form-control\"\n                        id=\"todoStatus\">\n                        <option repeat.for=\"status of statuses\" value.bind=\"status\">${status}</option>\n                    </select></td>\n                <td>${todo.dateDue | dateFormat}</td>\n                <td>\n                    <button click.trigger=\"deleteTodo(todo)\" type=\"button\" class=\"btn btn-danger btn-sm\">Delete</button>\n\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</template>";});;
define('modules/home',["exports", "aurelia-framework", "aurelia-router"], function (_exports, _aureliaFramework, _aureliaRouter) {
  "use strict";

  _exports.__esModule = true;
  _exports.Home = void 0;

  var _dec, _class;

  var Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router), _dec(_class =
  /*#__PURE__*/
  function () {
    function Home(router) {
      this.router = router;
      this.message = 'Home';
    }

    var _proto = Home.prototype;

    _proto.login = function login() {
      this.router.navigate('users');
    };

    return Home;
  }()) || _class);
  _exports.Home = Home;
});;
define('text!modules/home.html',[],function(){return "<template>\n\t<h1>${message}</h1>\n\t<button class=\"btn btn-primary\" click.trigger=\"login()\">Login</button>\n</template>\n";});;
define('modules/todos',["exports", "aurelia-framework", "../resources/data/todo-object"], function (_exports, _aureliaFramework, _todoObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.Todos = void 0;

  var _dec, _class;

  var Todos = (_dec = (0, _aureliaFramework.inject)(_todoObject.Todo), _dec(_class =
  /*#__PURE__*/
  function () {
    function Todos(todo) {
      this.todo = todo;
      this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
      this.statuses = ['Todo', 'In Process', 'Completed'];
      this.isCheckedCompleted = true;
    }

    var _proto = Todos.prototype;

    _proto.attached = function attached() {
      return regeneratorRuntime.async(function attached$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.getTodos());

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    };

    _proto.getTodos = function getTodos() {
      return regeneratorRuntime.async(function getTodos$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.todo.getTodos(this.userObj._id));

            case 2:
              this.showForm = false;

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    };

    _proto.updateTodo = function updateTodo(todo) {
      this.todo.selectedTodo = todo;
      this.saveTodo();
    };

    _proto.newTodo = function newTodo() {
      this.todo.newTodo(this.userObj._id);
      this.showForm = true;
    };

    _proto.editTodo = function editTodo(todo) {
      this.todo.selectedTodo = todo;
      this.showForm = true;
    };

    _proto.saveTodo = function saveTodo() {
      return regeneratorRuntime.async(function saveTodo$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.todo.saveTodo());

            case 2:
              this.getTodos();

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    };

    _proto.deleteTodos = function deleteTodos() {
      return regeneratorRuntime.async(function deleteTodos$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.todo.deleteTodos(this.todo._id));

            case 2:
              this.getTodos();

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    };

    _proto.Cancel = function Cancel() {
      this.showForm = false;
    };

    _proto.updateTodo = function updateTodo(todo) {
      this.todo.selectedTodo = todo;
      this.saveTodo();
    };

    _proto.deleteTodo = function deleteTodo(todo) {
      return regeneratorRuntime.async(function deleteTodo$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.todo.deleteTodo(todo._id));

            case 2:
              this.getTodos();

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    };

    return Todos;
  }()) || _class);
  _exports.Todos = Todos;
});;
define('text!modules/todos.html',[],function(){return "<template>\n\n<div class=\"container\" style=\"margin-top:75px;\">\n        <compose show.bind=\"showForm\" view=\"./components/todosForm.html\"></compose>\n        <compose show.bind=\"!showForm\" view=\"./components/todosTable.html\"></compose>\n      </div>\n\n    </template>";});;
define('modules/users',["exports", "aurelia-framework", "aurelia-router", "../resources/data/user-object"], function (_exports, _aureliaFramework, _aureliaRouter, _userObject) {
  "use strict";

  _exports.__esModule = true;
  _exports.Users = void 0;

  var _dec, _class;

  var Users = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _userObject.User), _dec(_class =
  /*#__PURE__*/
  function () {
    function Users(router, users) {
      this.router = router;
      this.users = users;
      this.message = 'Users';
    }

    var _proto = Users.prototype;

    _proto.newUser = function newUser() {
      this.user = {
        fname: "",
        lname: "",
        active: true,
        role: "user",
        email: "",
        password: ""
      };
    };

    _proto.save = function save() {
      return regeneratorRuntime.async(function save$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(this.user && this.user.fname && this.user.lname && this.user.email && this.user.password)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(this.users.saveUser(this.user));

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    };

    return Users;
  }()) || _class);
  _exports.Users = Users;
});;
define('text!modules/users.html',[],function(){return "<template>\n        <h1>${message}</h1>\n        <button click.trigger=\"newUser()\">New User</button>\n         <compose view=\"./components/editUser.html\"></compose>\n</template>";});;
define('resources/data/data-services',["exports", "aurelia-framework", "aurelia-fetch-client"], function (_exports, _aureliaFramework, _aureliaFetchClient) {
  "use strict";

  _exports.__esModule = true;
  _exports.DataServices = void 0;

  var _dec, _class;

  var DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class =
  /*#__PURE__*/
  function () {
    function DataServices(http) {
      var _this = this;

      this.httpClient = http;
      this.BASE_URL = "http://localhost:5000/api/";
      this.httpClient.configure(function (config) {
        config.withBaseUrl(_this.BASE_URL).withDefaults({
          credentials: 'same-origin',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'Fetch',
            'Authorization': 'Bearer' + localStorage.getItem('aurelia_token')
          }
        }).withInterceptor({
          request: function request(_request) {
            console.log('Requesting ${request.method} ${request.url}');
            return _request;
          },
          response: function response(_response) {
            console.log('Received ${response.status} ${response.url}');
            return _response;
          }
        });
      });
    }

    var _proto = DataServices.prototype;

    _proto.get = function get(url) {
      return this.httpClient.fetch(url).then(function (response) {
        return response.json();
      }).then(function (data) {
        return data;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.post = function post(content, url) {
      return this.httpClient.fetch(url, {
        method: 'post',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.put = function put(content, url) {
      return this.httpClient.fetch(url, {
        method: 'put',
        body: (0, _aureliaFetchClient.json)(content)
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    _proto.delete = function _delete(url) {
      return this.httpClient.fetch(url, {
        method: 'delete'
      }).then(function (response) {
        return response.json();
      }).then(function (object) {
        return object;
      }).catch(function (error) {
        return error;
      });
    };

    return DataServices;
  }()) || _class);
  _exports.DataServices = DataServices;
});;
define('resources/data/todo-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.Todo = void 0;

  var _dec, _class;

  var Todo = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function Todo(data) {
      this.data = data;
      this.TODO_SERVICE = 'todos';
    }

    var _proto = Todo.prototype;

    _proto.newTodo = function newTodo(id) {
      this.selectedTodo = {};
      this.selectedTodo.todo = "";
      this.selectedTodo.detail = "";
      this.selectedTodo.dateDue = new Date();
      this.selectedTodo.status = "Todo";
      this.selectedTodo.userid = id;
    };

    _proto.saveTodo = function saveTodo() {
      var serverResponse, url;
      return regeneratorRuntime.async(function saveTodo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!this.selectedTodo) {
                _context.next = 12;
                break;
              }

              if (!this.selectedTodo._id) {
                _context.next = 8;
                break;
              }

              url = this.TODO_SERVICE + "/" + this.selectedTodo._id;
              _context.next = 5;
              return regeneratorRuntime.awrap(this.data.put(this.selectedTodo, url));

            case 5:
              serverResponse = _context.sent;
              _context.next = 11;
              break;

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(this.data.post(this.selectedTodo, this.TODO_SERVICE));

            case 10:
              serverResponse = _context.sent;

            case 11:
              return _context.abrupt("return", serverResponse);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    };

    _proto.getTodos = function getTodos(userid) {
      var url, response;
      return regeneratorRuntime.async(function getTodos$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = this.TODO_SERVICE + '/user/' + userid;
              _context2.next = 3;
              return regeneratorRuntime.awrap(this.data.get(url));

            case 3:
              response = _context2.sent;

              if (!response.error) {
                this.todosArray = response;
              } else {
                this.todosArray = [];
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    };

    _proto.deleteTodo = function deleteTodo(id) {
      var url;
      return regeneratorRuntime.async(function deleteTodo$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = this.TODO_SERVICE + '/' + id;
              _context3.next = 3;
              return regeneratorRuntime.awrap(this.data.delete(url));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    };

    return Todo;
  }()) || _class);
  _exports.Todo = Todo;
});;
define('resources/data/user-object',["exports", "aurelia-framework", "./data-services"], function (_exports, _aureliaFramework, _dataServices) {
  "use strict";

  _exports.__esModule = true;
  _exports.User = void 0;

  var _dec, _class;

  var User = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class =
  /*#__PURE__*/
  function () {
    function User(data) {
      this.data = data;
      this.USER_SERVICE = 'users';
    }

    var _proto = User.prototype;

    _proto.saveUser = function saveUser(user) {
      var serverResponse;
      return regeneratorRuntime.async(function saveUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!user) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return regeneratorRuntime.awrap(this.data.post(user, this.USER_SERVICE));

            case 3:
              serverResponse = _context.sent;
              return _context.abrupt("return", serverResponse);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    };

    return User;
  }()) || _class);
  _exports.User = User;
});;
define('resources/elements/flat-picker/flat-picker',["exports", "aurelia-framework", "flatpickr"], function (_exports, _aureliaFramework, _flatpickr) {
  "use strict";

  _exports.__esModule = true;
  _exports.FlatPickerCustomElement = void 0;
  _flatpickr = _interopRequireDefault(_flatpickr);

  var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  var FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({
    defaultBindingMode: _aureliaFramework.bindingMode.twoWay
  }), _dec(_class = (_class2 = (_temp =
  /*#__PURE__*/
  function () {
    function FlatPickerCustomElement(element) {
      this.backgroundColor = 'white';

      _initializerDefineProperty(this, "config", _descriptor, this);

      _initializerDefineProperty(this, "startdate", _descriptor2, this);

      _initializerDefineProperty(this, "enddate", _descriptor3, this);

      _initializerDefineProperty(this, "controlid", _descriptor4, this);

      _initializerDefineProperty(this, "disabled", _descriptor5, this);

      _initializerDefineProperty(this, "value", _descriptor6, this);

      this.element = element;
    }

    var _proto = FlatPickerCustomElement.prototype;

    _proto.bind = function bind() {
      var defaultConfig = {
        altInput: true,
        altFormat: "F j, Y",
        minDate: this.startdate,
        maxDate: this.enddate,
        wrap: true,
        onReady: function onReady(dateObj, dateStr, instance) {
          var $cal = $(instance.calendarContainer);

          if ($cal.find('.flatpickr-clear').length < 1) {
            $cal.append('<div class="flatpickr-clear">Clear</div>');
            $cal.find('.flatpickr-clear').on('click', function () {
              instance.clear();
              instance.close();
            });
          }
        }
      };
      this._config = Object.assign({}, defaultConfig, this.config);
      this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
    };

    _proto.attached = function attached() {
      this.flatpickr = new _flatpickr.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
      this.valueChanged();
    };

    _proto.fireEvent = function fireEvent(element, type, data) {
      var changeEvent;

      if (window.CustomEvent) {
        changeEvent = new CustomEvent('change', {
          detail: {
            value: data
          },
          bubbles: true
        });
      } else {
        changeEvent = document.createEvent('CustomEvent');
        changeEvent.initCustomEvent('change', true, true, {
          detail: {
            value: data
          }
        });
      }

      this.element.dispatchEvent(changeEvent);
    };

    _proto.startdateChanged = function startdateChanged(newValue, oldValue) {
      if (this.flatpickr) {
        this.flatpickr.set("minDate", newValue);
      }
    };

    _proto.enddateChanged = function enddateChanged(newValue, oldValue) {
      if (this.flatpickr) {
        this.flatpickr.set("maxDate", newValue);
      }
    };

    _proto.onChange = function onChange(selectedDates, dateStr, instance) {
      var _this = this;

      if (!this._datesAreSynced(this.value, selectedDates)) {
        switch (selectedDates.length) {
          case 0:
            this.value = undefined;
            break;

          case 1:
            this.value = this._cloneDate(selectedDates[0]);
            break;

          default:
            this.value = selectedDates.map(function (d) {
              return _this._cloneDate(d);
            });
            break;
        }
      }

      this.fireEvent(this.element, 'changeBeginDate', {
        date: this.value
      });
    };

    _proto.clear = function clear() {
      if (!this.flatpickr) {
        return;
      } // this.flatpickr.clear();

    };

    _proto.valueChanged = function valueChanged() {
      var _this2 = this;

      if (!this.flatpickr) {
        return;
      }

      if (this._datesAreSynced(this.value, this.flatpickr.selectedDates)) {
        return;
      }

      var newDate;

      if (!this.value) {
        newDate = undefined;
      } else if (!Array.isArray(this.value)) {
        newDate = this._cloneDate(this.value);
      } else {
        newDate = this.value.map(function (d) {
          return _this2._cloneDate(d);
        });
      }

      this.flatpickr.setDate(newDate);
    };

    _proto._datesAreSynced = function _datesAreSynced(model, view) {
      model = model || [];
      var modelDates = Array.isArray(model) ? model : [model];

      var _loop = function _loop(d) {
        var modelDate = modelDates[d];

        if (view.findIndex(function (v) {
          return v.valueOf() === modelDate.valueOf();
        }) > -1) {
          return "continue";
        }

        return {
          v: false
        };
      };

      for (var d = 0; d < modelDates.length; d++) {
        var _ret = _loop(d);

        switch (_ret) {
          case "continue":
            continue;

          default:
            if (typeof _ret === "object") return _ret.v;
        }
      }

      var _loop2 = function _loop2(_d) {
        var viewDate = view[_d];

        if (modelDates.findIndex(function (m) {
          return m.valueOf() === viewDate.valueOf();
        }) > -1) {
          return "continue";
        }

        return {
          v: false
        };
      };

      for (var _d = 0; _d < view.length; _d++) {
        var _ret2 = _loop2(_d);

        switch (_ret2) {
          case "continue":
            continue;

          default:
            if (typeof _ret2 === "object") return _ret2.v;
        }
      }

      return true;
    };

    _proto._cloneDate = function _cloneDate(d) {
      return new Date(d.getTime ? d.valueOf() : d);
    };

    return FlatPickerCustomElement;
  }(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "config", [_aureliaFramework.bindable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function initializer() {
      return {};
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "startdate", [_aureliaFramework.bindable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "enddate", [_aureliaFramework.bindable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "controlid", [_aureliaFramework.bindable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_aureliaFramework.bindable], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2)) || _class);
  _exports.FlatPickerCustomElement = FlatPickerCustomElement;
});;
define('text!resources/elements/flat-picker/flat-picker.html',[],function(){return "<template>\n    <style>\n      .aurelia-flatpickr {\n        background-color: white !important;\n      }\n      .disable{\n        background-color: #eeeeee;\n      }\n    </style>\n    <require from=\"flatpickr/flatpickr.css\"></require>\n     <div class=\"input-group aurelia-flatpickr\">\n      <input type=\"text\" class=\"aurelia-flatpickr form-control enable\" placeholder=\"Select date\" data-input>\n      <span class=\"input-group-btn\">\n        <button style=\"height:39px;\" class=\"btn btn-default\" type=\"button\" data-clear><i class=\"fa fa-trash fa-border\"></i></button>\n      </span>\n  </div>\n</template>\n";});;
define('resources/elements/nav-bar',["exports", "aurelia-framework", "aurelia-router", "aurelia-auth"], function (_exports, _aureliaFramework, _aureliaRouter, _aureliaAuth) {
  "use strict";

  _exports.__esModule = true;
  _exports.NavBar = void 0;

  var _dec, _class;

  var NavBar = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _aureliaAuth.AuthService), _dec(_class =
  /*#__PURE__*/
  function () {
    function NavBar(router, auth) {
      this.authenticated = false;
      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.email = "";
      this.password = "";
    }

    var _proto = NavBar.prototype;

    _proto.attached = function attached() {
      $('.navbar-nav a').on('click', function () {
        $('.navbar-nav').find('li.active').removeClass('active');
        $(this).parent('li').addClass('active');
      });
    };

    _proto.login = function login() {
      var _this = this;

      //   console.log(this.email);
      //   console.log(this.password);
      //  this.authenticated = true;
      //  this.router.navigate('home');
      return this.auth.login(this.email, this.password).then(function (response) {
        _this.userObj = response.user;
        sessionStorage.setItem("userObj", JSON.stringify(_this.userObj));
        _this.loginError = "";
        _this.authenticated = _this.auth.isAuthenticated();

        _this.router.navigate('home');
      }).catch(function (error) {
        console.log(error);
        _this.authenticated = false;
        _this.loginError = "Invalid credentials.";
      });
    };

    _proto.logout = function logout() {
      // this.authenticated = false;
      //  this.router.navigate('landing');
      this.auth.logout();
      sessionStorage.removeItem('userObj');
      this.authenticated = this.auth.isAuthenticated();
    };

    _proto.bind = function bind() {
      this.authenticated = this.auth.isAuthenticated();
    };

    _proto.registerUser = function registerUser() {
      this.router.navigate('todos');
    };

    return NavBar;
  }()) || _class);
  _exports.NavBar = NavBar;
});;
define('text!resources/elements/nav-bar.html',[],function(){return "<template>\n    <nav class=\"navbar navbar-expand-lg navbar-light bg-light\">\n      <a class=\"navbar-brand\" href=\"#\">Things ToDo!</a>\n      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\n        aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n  \n      <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n        <ul show.bind=\"authenticated\" class=\"navbar-nav mr-auto\">\n          <!-- <li class=\"nav-item active\">\n            <a class=\"nav-link\" href=\"#\">Home <span class=\"sr-only\">(current)</span></a>\n          </li> -->\n          <li class=\"nav-item\">\n              <a class=\"nav-link\" href=\"#users\">Users </a>\n            </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" href=\"#todos\">Todos </a>\n          </li>\n          <li class=\"nav-item\">\n            <a class=\"nav-link\" href=\"#\" click.trigger=\"logout()\">Logout </a>\n          </li>\n        </ul>\n      </div>\n      <div show.bind=\"!authenticated\">\n        <form class=\"form-inline\">\n          <div class=\"form-group mb-2\">\n              <button type=\"submit\"  class=\"btn btn-primary mb-2\">Email</button>\n            <label for=\"staticEmail2\" class=\"sr-only\"> Email ID </label>\n            <input value.bind=\"email\" type=\"text\" class=\"form-control\" id=\"staticEmail2\" value=\"email@example.com\">\n          </div>\n          <div class=\"form-group mx-sm-3 mb-2\">\n            <label for=\"inputPassword2\" class=\"sr-only\">Password</label>\n            <input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"inputPassword2\" placeholder=\"Password\">\n          </div>\n          <button type=\"submit\" click.trigger=\"login()\" class=\"btn btn-primary mb-2\">Login</button>\n          <button click.trigger=\"registerUser()\" class=\"btn btn-primary mb-2\">Register User</button>\n        </form>\n      </div>\n    </nav>\n  </template>";});;
define('resources/index',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.configure = configure;

  function configure(config) {
    config.globalResources(['./elements/nav-bar', './elements/flat-picker/flat-picker', './value-converters/date-format', './value-converters/filter-todos']);
  }
});;
define('resources/value-converters/date-format',["exports", "moment"], function (_exports, _moment) {
  "use strict";

  _exports.__esModule = true;
  _exports.DateFormatValueConverter = void 0;
  _moment = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var DateFormatValueConverter =
  /*#__PURE__*/
  function () {
    function DateFormatValueConverter() {}

    var _proto = DateFormatValueConverter.prototype;

    _proto.toView = function toView(value) {
      if (value === undefined || value === null) {
        return;
      }

      var dateFormatted = (0, _moment.default)(value).format('MMM Do YYYY');
      return dateFormatted;
    };

    return DateFormatValueConverter;
  }();

  _exports.DateFormatValueConverter = DateFormatValueConverter;
});;
define('resources/value-converters/filter-todos',["exports"], function (_exports) {
  "use strict";

  _exports.__esModule = true;
  _exports.FilterTodosValueConverter = void 0;

  var FilterTodosValueConverter =
  /*#__PURE__*/
  function () {
    function FilterTodosValueConverter() {}

    var _proto = FilterTodosValueConverter.prototype;

    _proto.toView = function toView(todos, nofilterTodos) {
      if (!todos) return;
      if (!nofilterTodos) return todos;
      var filteredTodos = [];
      todos.forEach(function (todo) {
        if (todo.status !== 'Completed') filteredTodos.push(todo);
      });
      return filteredTodos;
    };

    return FilterTodosValueConverter;
  }();

  _exports.FilterTodosValueConverter = FilterTodosValueConverter;
});;
define('resources',['resources/index'],function(m){return m;});
//# sourceMappingURL=app-bundle.js.map