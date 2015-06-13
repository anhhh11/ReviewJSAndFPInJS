(function () {
    var _ = R;
    function getIncompleteTaskSummariesForMember(member) {
        return $.getJSON("tasks.json").then(
            _.pipe(
                _.prop("tasks"),
                _.filter(_.whereEq({ member: member, complete: false })),
                _.map(_.compose(_.pick(['id', 'dueDate', 'title', 'priority']), _.lensProp("dueDate").map(Date.parse))),
                _.sortBy(_.prop("dueDate"))
            ));
    }
    window.getIncompleteTaskSummariesForMember = getIncompleteTaskSummariesForMember;
})()