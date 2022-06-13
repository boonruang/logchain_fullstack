$(function () {
  $('#blockview_table').DataTable({
    responsive: false,
    autoWidth: false,
    lengthChange: false,
    order: [[0, 'desc']],
    language: {
      search: 'ค้นหา ',
    },
  })
})
