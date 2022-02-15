'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = window.axios;
var basicTokenKey = 'BasicToken';

var ApplicationBuilder = function () {
    function ApplicationBuilder() {
        _classCallCheck(this, ApplicationBuilder);

        this._casBase = '';
    }

    _createClass(ApplicationBuilder, [{
        key: 'ensureToken',
        value: function ensureToken() {
            var token = localStorage.getItem('token');
            if (token) return token;
            return '';
        }
        /**确保token */

    }, {
        key: 'ensureTokenAsync',
        value: function ensureTokenAsync() {
            if (this.ensureToken()) return Promise.resolve(true);
            return this.fetchBasicTokenFromServerAsync().then(function () {
                return true;
            });
        }
        /**从localstarge中获取token，如果还未配置在localstage，则让其在后续请求中带上 */

    }, {
        key: 'ensureBasicToken',
        value: function ensureBasicToken() {
            var token = localStorage.getItem(basicTokenKey);
            if (token) return token;
            return token;
        }
    }, {
        key: 'fetchBasicTokenFromServerAsync',
        value: function fetchBasicTokenFromServerAsync() {
            var instance = axios.create();
            return instance.post(this._tokenRequestConfigure.OrgTokenLink, this._tokenRequestConfigure, {
                headers: {
                    "Content-Type": 'application/json',
                    "Access-Control-Allow-Origin": '*',
                    'Access-Control-Allow-Method': '*'
                }
            }).then(function (x) {
                return x.data.data;
            }).then(function (x) {
                return localStorage.setItem(basicTokenKey, x.token);
            });
        }
        /**给axios添加跨域请求头 */

    }, {
        key: 'withCors',
        value: function withCors() {
            if (axios) {
                axios.interceptors.request.use(function (configure) {
                    configure.headers["Access-Control-Allow-Origin"] = "*";
                    configure.headers["Access-Control-Allow-Method"] = "*";
                    return configure;
                });
            }
            return this;
        }
        /**携带机构信息 */

    }, {
        key: 'withBasicToken',
        value: function withBasicToken() {
            var _this = this;

            if (axios) {
                axios.interceptors.request.use(function (config) {
                    var basicToken = _this.ensureBasicToken();
                    if (basicToken && !config['Authorization']) config.headers["Authorization"] = 'Bearer ' + basicToken;
                    return config;
                });
            }
            return this;
        }
        /**给api自动加上请求域名部分 */

    }, {
        key: 'withDomainAndToken',
        value: function withDomainAndToken() {
            var _this2 = this;

            if (axios) {
                axios.interceptors.request.use(function (config) {
                    var _a, _b;
                    if (((_a = config.url) === null || _a === void 0 ? void 0 : _a.startsWith('http://')) || ((_b = config.url) === null || _b === void 0 ? void 0 : _b.startsWith('https://'))) return config;
                    config.baseURL = _this2._apiDomainAndPort;
                    return config;
                });
            }
            return this;
        }
        /**携带token */

    }, {
        key: 'withToken',
        value: function withToken() {
            var _this3 = this;

            if (axios) {
                axios.interceptors.request.use(function (config) {
                    var token = _this3.ensureToken();
                    if (token) config.headers["Authorization"] = 'Bearer ' + token;
                    return config;
                });
            }
            return this;
        }
        /**401重新拿token并重试 */

    }, {
        key: 'handle401RetypResponse',
        value: function handle401RetypResponse() {
            var _this4 = this;

            if (axios) {
                axios.defaults.retry = 1; //重试次数
                axios.defaults.retryDelay = 1000; //重试延时
                axios.defaults.shouldRetry = function (error) {
                    return error && error.response && error.response.status == 401;
                }; //401重试
                axios.interceptors.response.use(function (response) {
                    return response;
                }, function (error) {
                    {
                        var _ret = function () {
                            var config = error.config;
                            if (!config || !config.retry) return {
                                    v: Promise.reject(error)
                                };
                            if (!config.shouldRetry || typeof config.shouldRetry != 'function') {
                                return {
                                    v: Promise.reject(error)
                                };
                            }
                            //判断是否满足重试条件
                            if (!config.shouldRetry(error)) {
                                return {
                                    v: Promise.reject(error)
                                };
                            }
                            // 设置重置次数，默认为0
                            config.__retryCount = config.__retryCount || 0;
                            // 判断是否超过了重试次数
                            if (config.__retryCount >= config.retry) {
                                return {
                                    v: Promise.reject(error)
                                };
                            }
                            //重试次数自增
                            config.__retryCount += 1;
                            var backoff = new Promise(function (resolve) {
                                setTimeout(function () {
                                    resolve(1);
                                }, config.retryDelay || 1);
                            });
                            localStorage.removeItem('token');
                            return {
                                v: Promise.all([backoff, _this4.ensureTokenAsync()]).then(function () {
                                    return axios(config);
                                })
                            };
                        }();

                        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                    }
                });
            }
            return this;
        }
        /**403跳转登录 */

    }, {
        key: 'handle403Go2LoginResponse',
        value: function handle403Go2LoginResponse() {
            var _this5 = this;

            if (axios) {
                axios.interceptors.response.use(undefined, function (error) {
                    // unauth 存在则需要登录
                    if (error.response.status == 403 && error.response.headers.unauth) {
                        localStorage.removeItem('token');
                        var current = window.location.href;
                        localStorage.setItem('COM+', current);

                        //   window.open(this._casBase + '/cas/login?service=' + encodeURIComponent(window.location.origin),'_blank');
                        window.location.href = _this5._casBase + '/cas/login?service=' + encodeURIComponent('' + window.location.origin + window.location.pathname);
                        // window.close();
                    }
                    return Promise.reject(error);
                });
            }
            return this;
        }
        /**配置cas基础地址 */

    }, {
        key: 'configureCasBase',
        value: function configureCasBase(casBaseUrl) {
            if (casBaseUrl == null) throw new Error('请正确配置cas地址');
            this._casBase = casBaseUrl;
            return this;
        }
        /**配置默认的token请求服务 */

    }, {
        key: 'configureOrgInfo',
        value: function configureOrgInfo(orgTokenConfigure) {
            this._tokenRequestConfigure = orgTokenConfigure;
            return this;
        }
        /**配置api接口的域名和端口部分 */

    }, {
        key: 'configureApiBase',
        value: function configureApiBase(apiDomainAndPort) {
            this._apiDomainAndPort = apiDomainAndPort;
            return this;
        }
        /**添加默认的axios请求中间件
         * 包括 1 cors跨域中间件
         * 2.携带token中间件
         * 3.用户未登录的时候，携带机构token中间件
         * 4. 401错误，用机构token再次请求
         * 5. 403 错误，跳转登录页
         */

    }, {
        key: 'buildDefaultApplication',
        value: function buildDefaultApplication() {
            var _this6 = this;

            this.ensureTokenAsync().then(function () {
                if (_this6._tokenRequestConfigure == null) throw new Error('在调用此方法前，必须先调用configureOrgInfo以配置机构信息');
                if (axios == null) throw new Error("请确保该调用该方法是,axios已被初始化");

                axios.defaults.loaded = true;
                _this6.withDomainAndToken() //给api请求加上域名部分
                .withCors() //跨域请求
                .withToken() //带上token
                .withBasicToken() //如果没有token，带上含有基本信息的token
                .handle401RetypResponse() //后端返回401的时候，表示token失效或过期，需要先带上基本token请求
                .handle403Go2LoginResponse(); //当后端返回403的时候，跳转登录页面;
            });
        }
    }]);

    return ApplicationBuilder;
}();

new ApplicationBuilder().configureCasBase("http://192.168.21.43:10011").configureApiBase('http://192.168.21.46:8000').configureOrgInfo({
    orgId: "string",
    orgSecret: 'string',
    orgCode: "cqu",
    OrgTokenLink: 'http://192.168.21.46:5002/api/Auth/AccessToken'
}).buildDefaultApplication();