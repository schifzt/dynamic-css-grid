const container = document.getElementById("container");

const head = new Pane(isHead = true);
head.next.splitColumn();
head.next.splitColumn();
head.next.splitRow();
head.next.next.splitRow();
// head.next.next.next.splitRow();
// head.next.splitColumn();
// head.next.splitRow();
