(function () {
    var getIncompleteTaskSummariesForMember_imperative = function (memberName) {
        return $.getJSON("tasks.json")
        .then(function getTasks(data) {
            return data.tasks;
        })
        .then(function filterTasksOfThisMember(tasks) {
            var results = [], len = tasks.length;
            for (var i = 0; i < len; i++) {
                if (tasks[i].member == memberName) {
                    results.push(tasks[i]);
                }
            }
            return results;
        })
        .then(function filterCompleteTasks(tasks) {
            var results = [], len = tasks.length;
            for (var i = 0; i < len ; i++) {
                if (!tasks[i].complete) {
                    results.push(tasks[i]);
                }
            }
            return results;
        })
        .then(function selectSpecificFields(tasks) {
            var results = [], task;
            for (var i = 0, len = tasks.length; i < len; i++) {
                task = tasks[i];
                results.push({
                    id: task.id,
                    dueDate: Date.parse(task.dueDate),
                    title: task.title,
                    priority: task.priority
                })
            }
            return results;
        })
        .then(function sortByDueDate(tasks) {
            tasks.sort(function (first, second) {
                return first.dueDate - second.dueDate;
            });
            return tasks;
        });
    };
    window.getIncompleteTaskSummariesForMember_imperative = getIncompleteTaskSummariesForMember_imperative;
})();