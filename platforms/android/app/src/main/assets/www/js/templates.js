Framework7.registerComponent('list-item-1', {
    template: `

         <li>
    
            <a href="/main/restoraunt/{{$props.id}}{{#js_if "this.$props.category !== 'false' "}}/{{$props.category}}{{/js_if}}" class="item-content item-link">
    
                <div class="item-media" style="background-image: url('{{$props.logo}}')"></div>
    
                <div class="item-inner">
    
                    <div class="item-title-row">
    
                        <div class="item-title">{{$props.name}}</div>
    
                    </div>
    
                    <div class="item-subtitle text-color-gray">{{$props.adres}}</div>
    
                    <div>
    
                        <span class="badge">{{$props.deliveryTime}} мин</span>
    
                        <span class="badge">Заказ от {{$props.minOrderSum}} ₽</span>
    
                    </div>
    
                    <div class="item-text">
    
                        <i class="icon f7-icons text-color-orange rating">star_fill</i>
    
                        <span>{{$props.rating}} ({{$props.reviewsCount}})</span>
    
                    </div>
    
                </div>
    
            </a>
    
        </li>

    `
});