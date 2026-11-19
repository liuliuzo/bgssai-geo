# bgssai-geo-task 当前版本功能案例

功能基线为 develop 的 `86c2c9260499699151733deb3243ccdf25008bf8`。执行时记录实际 SHA、环境、执行时间、观察结果和证据。

用应用界面、接口或注明的隔离测试夹具执行下表。自动回归命令在表后，运行组件测试与部署环境验收分别记录。

| 用例ID | 关联需求 | 优先级 | 端 | 前置条件与数据 | 测试步骤 | 期望结果 | 结果 | 备注 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TC-GEO-TASK-20261119-01-P | REQ-GEO-TASK-20261119-01 | P1 | HTTP 服务 | 在隔离构建目录按当前 package.json 构建并启动 HTTP 服务，选择同时生成 index.html 和 index.md 的站点目录。 | 对同一目录分别发送 Accept: text/html 和 Accept: text/markdown 请求。 | HTML 与 Markdown 请求分别取得对应文件和内容类型，两者指向同一站点内容。 | 待测 | 站点首页的 HTML 与 Markdown 表示 |
| TC-GEO-TASK-20261119-01-N | REQ-GEO-TASK-20261119-01 | P1 | HTTP 服务 | 在隔离构建目录按当前 package.json 构建并启动 HTTP 服务，选择同时生成 index.html 和 index.md 的站点目录。 | 设置 Accept: text/html, text/markdown 再请求同一目录。 | 同时接受两种表示时返回 HTML，避免将浏览器请求误作纯 Markdown。 | 待测 | 站点首页的 HTML 与 Markdown 表示 |
| TC-GEO-TASK-20261119-02-P | REQ-GEO-TASK-20261119-02 | P1 | HTTP 服务 | 准备两个隔离实例，一个有完整构建，另一个使用空 dist 目录。 | 对完整实例调用 /bgssai/health/liveness 与 /bgssai/health/readiness。 | 两个请求均返回 200，静态包和子域索引组件就绪。 | 待测 | 产物缺失与探针 |
| TC-GEO-TASK-20261119-02-N | REQ-GEO-TASK-20261119-02 | P1 | HTTP 服务 | 准备两个隔离实例，一个有完整构建，另一个使用空 dist 目录。 | 对空 dist 的独立实例重复两个调用。 | 存活探针返回 200 就绪返回 503，静态构建组件显示 DOWN。 | 待测 | 产物缺失与探针 |

## 本地自动回归

从仓库根目录运行，使用仓库支持的 Node.js、JDK/Maven 或 Python 环境。每条命令须实际发现并执行测试。

- REQ-GEO-TASK-20261119-01 · [static-server.test.mjs](../../tests/static-server.test.mjs) · `node --test tests/static-server.test.mjs`
