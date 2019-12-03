
let update = document.getElementById('update');
let del = document.getElementById('delete');

update.addEventListener('click', () => {
    fetch('issues', {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'status': 'closed'
        })

        })
        .then(res=> {
            if (res.ok) return res.json();
        })
        .then(data => {
            console.log(data)
            window.location.reload(true)
        })
});

del.addEventListener('click', () => {
    fetch('issues', {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'status': 'closed',
            })
        })
        .then(res => {
            if(res.ok) return res.json();
        })
        .then(data => {
            console.log(data)
            window.location.reload(true);
        })
    })