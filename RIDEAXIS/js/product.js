$(document).ready(function(){
    count();
    $('.addtocart').click(function(){
        // alert("OK");
        let id = $(this).data('id');
        let name = $(this).data('name');
        let price = $(this).data('price');
        console.log(id,name,price);
        let items = {
            id: id,
            name: name,
            price:price,
            qty: 1
        }
        let itemstring = localStorage.getItem('shops');
        let itemArray;
        if(itemstring == null){
            itemArray = [];
        }else{
            itemArray = JSON.parse(itemstring);
        }

        let status = false;
        $.each(itemArray, function(i,v){
            if(id == v.id){
                v.qty++;
                status = true;
            }
        })
        if (status == false) {
            itemArray.push(items);
        }
        
        let itemdata = JSON.stringify(itemArray);
        localStorage.setItem('shops', itemdata);
        count();

        
    });

    function count(){
        let itemstring = localStorage.getItem('shops');
        if(itemstring){
            let itemArray = JSON.parse(itemstring);
            //console.log(itemArray);
            
            let count = 0;
            $.each(itemArray, function(i,v){
                if(itemArray != 0){
                    count += v.qty;
                    $('#item-count').text(count);
                }else{
                    $('#item-count').text('0')
                }
            })
        }
    }
    getdata();
    function getdata(){
        let itemstring = localStorage.getItem('shops');
        if(itemstring){
            let itemArray = JSON.parse(itemstring);

            let datatwo = '';
            let data = '';
            let no = 1;
            let total = 0;
            // let footer = document.getElementById('.offcanvas-foote')
            $.each(itemArray,function(i,v){
                let name = v.name;
                let price = v.price;
                let qty = v.qty;
            
                

                data += `<tr>
                            <td>${name}</td>
                            <td>${price}</td>
                            <td>
                                <button class="min" data-key="${i}" style="border-radius: 8px; background-color: white;"><i class="fa-solid fa-minus"></i></button>
                                <h6 class="fw-bold">${qty}</h6>
                                <button class="max" data-key="${i}" style="border-radius: 8px; background-color: white;"><i class="fa-solid fa-plus"></i></button>
                            </td>
                        </tr>`;

                        total += price * qty;
            });
                datatwo += `<p class=" float-end mt-2 ms-2">Total = $${total}</p> <button class="btn btn-outline-primary  float-end"> Check Out </button>`;

            
            


           

            $('tbody').html(data);
            $('.alltotal').html(datatwo);

        }
    }

    $('tbody').on('click','.min',function(){
        let key = $(this).data('key');
        // alert("sksdjkjdf");
        let itemstring = localStorage.getItem('shops');
        if(itemstring){
            let itemArray = JSON.parse(itemstring);
            $.each(itemArray, function(i,v){
                if(key == i){
                    v.qty--;
                    if(v.qty== 0){
                        let ans = confirm('Are you sure remove');
                        if (ans) {
                            itemArray.splice(key,1);

                            
                        }else{
                            v.qty = 1;
                        }
                    }
                }
            })
            let itemdata = JSON.stringify(itemArray);
            localStorage.setItem('shops',itemdata);
            getdata();
            count();
        }
    })
    $('tbody').on('click','.max',function(){
        let key = $(this).data('key');
        // alert("sksdjkjdf");
        let itemstring = localStorage.getItem('shops');
        if(itemstring){
            let itemArray = JSON.parse(itemstring);
            $.each(itemArray, function(i,v){
                if(key == i){
                    v.qty++;
                    
                }
            })
            let itemdata = JSON.stringify(itemArray);
            localStorage.setItem('shops',itemdata);
            getdata();
            count();
        }
    })
});