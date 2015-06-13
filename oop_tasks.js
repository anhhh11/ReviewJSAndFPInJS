(function () {
    var TaskList = (function () {
        var TaskList = function (/*Task[]*/ tasks) {
            this.tasks = tasks;
        };
        TaskList.prototype.chooseByMember = function (memberName) {
            var results = [];
            for (var i = 0, len = this.tasks.length; i < len; i++) {
                if (this.tasks[i].member === memberName) {
                    results.push(this.tasks[i]);
                }
            }
            this.tasks = results;
        };
        TaskList.prototype.chooseByCompletion = function (completion) {
            var results = [];
            for (var i = 0, len = this.tasks.length; i < len; i++) {
                if (this.tasks[i].complete == completion) {
                    results.push(this.tasks[i]);
                }
            }
            this.tasks = results;
        };
        TaskList.prototype.getSummaries = function () {
            var results = [], task;
            for (var i = 0, len = this.tasks.length; i < len; i++) {
                task = this.tasks[i];
                results.push({
                    id: task.id,
                    dueDate: task.dueDate,
                    title: task.title,
                    priority: task.priority
                })
            }
            return new TaskList(results);
        };

        TaskList.prototype.sort = function (/*TaskListSorter*/ sorter) {
            this.tasks.sort(sorter.getSortFunction());
        };

        return TaskList;
    })();
    var TaskListSorter = (function () {
        var TaskListSorter = function (propName) {
            this.propName = propName;
        };
        TaskListSorter.prototype.getSortFunction = function () {
            var propName = this.propName;
            return function (first, second) {
                return first[propName] < second[propName] ? -1 :
                       first[propName] > second[propName] ? +1 : 0;
            }
        };

        return TaskListSorter;
    }());
    window.TaskList = TaskList;
    window.TaskListSorter = TaskListSorter;
})();