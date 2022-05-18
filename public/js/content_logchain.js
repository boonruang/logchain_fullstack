$(function () {
  $('#logchain_table').DataTable({
    responsive: true,
    autoWidth: false,
    lengthChange: false,
    order: [[0, 'desc']],
    language: {
      search: 'ค้นหา ',
    },
  })
})
