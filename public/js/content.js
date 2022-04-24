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
    lengthChange: false,
    order: [[0, 'desc']],
    language: {
      search: 'ค้นหา ',
    },
  })
  $('#blockview_table').DataTable({
    responsive: true,
    autoWidth: false,
    lengthChange: false,
    order: [[0, 'desc']],
    language: {
      search: 'ค้นหา ',
    },
  })
})
