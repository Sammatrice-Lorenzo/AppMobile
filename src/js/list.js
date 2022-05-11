
// import { createList } from 'framework7';

// const list = createList(app,
//     app.request.get('http://localhost/licence/API_TodoList/list.php').then(function (res) {
//         var response = JSON.parse(res.data)
//         for(const i of response) {
//             console.log(i.name)
//             $('.block-strong').append(`
//                 <p><a class="toggle" href="">${i.name}</a></p>
//                 <div class="toggle-content" id="">
//                     <ul></ul>
//                 </div>
//             `);
//         }
//     }).catch(function (err) {
//         console.log(err.xhr)
//         console.log(err.status)
//         console.log(err.message)
//     })
// )
// export default list;