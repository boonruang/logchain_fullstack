$(function () {
  $('#example1').DataTable({
    responsive: true,
    autoWidth: false,
  })
  $('#example2').DataTable({
    paging: true,
    lengthChange: false,
    searching: false,
    ordering: true,
    info: true,
    autoWidth: false,
    responsive: true,
  })
  $('#logchain_table').DataTable({
    responsive: true,
    autoWidth: false,
    order: [[0, 'desc']],
  })
  $('#blockview_table').DataTable({
    responsive: true,
    autoWidth: false,
    order: [[0, 'desc']],
  })
})
