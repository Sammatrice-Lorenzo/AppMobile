
import Framework7 from 'framework7/bundle';
import $ from 'dom7';

const list = (
    Framework7.request.get('http://localhost/licence/API_TodoList/list.php').then(function (res) {
        var response = JSON.parse(res.data)
        for(const i of response) {
            $('.divList').append(`
                <p><a class="toggle" href="/formUpdateList/${i.name}/${i.id}">${i.name}</a></p>
                <div class="toggle-content" id="">
                    <ul></ul>
                </div>
            `);
        }
    }).catch(function (err) {
        console.log(err.xhr)
        console.log(err.status)
        console.log(err.message)
    })
)
export default list;