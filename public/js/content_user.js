$(function () {
  $('#user_table').DataTable({
    searching: true,
    responsive: true,
    autoWidth: false,
    lengthChange: false,
    pageLength: 100,
    order: [[0, 'desc']],
    language: {
      search: 'ค้นหา ',
    },
  })
})
