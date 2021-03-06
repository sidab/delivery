Framework7.registerComponent('list-item-1', {
    template: `

         <li class="list-item-1">
    
            <a data-href="/main/restoraunt/{{$props.id}}{{#js_if "this.$props.category !== 'false' "}}/{{$props.category}}{{/js_if}}" class="open-cache-page item-content item-link {{#js_if "this.$props.soon === '1'"}}disabled{{/js_if}}">
    
                <div class="item-media margin-vertical" style="background-image: url('{{js "app.methods.localImages.get(this.$props.logo)"}}')"></div>
    
                <div class="item-inner">
    
                    <div class="item-title-row">
    
                        <div class="item-title">{{$props.name}}</div>
    
                        {{#js_if "this.$props.soon === '1'"}}
                    
                            <div class="badge soon">Скоро</div>
                    
                        {{/js_if}}
                        
                        {{#js_if "(this.$props.reviewsCount < app.params.config.min_reviews_count_for_show_rating) && this.$props.soon === '0'"}}
                        
                            <div class="badge color-primary">new</div>
                    
                        {{/js_if}}
                        
                    </div>
                            
                    <div class="item-subtitle text-color-gray">{{$props.adres}}</div>
        
                    {{#js_if "this.$props.soon === '0'"}}
                        
                        <div>
        
                            <span class="badge">{{$props.deliveryTime}} мин</span>
        
                            <span class="badge">Заказ от {{$props.minOrderSum}} ₽</span>
        
                        </div>
                        
                        {{#js_if "this.$props.reviewsCount >= app.params.config.min_reviews_count_for_show_rating"}}
                        
                        <div class="item-text">
        
                            <i class="icon f7-icons text-color-orange rating">star_fill</i>
        
                            <span>{{$props.rating}} ({{$props.reviewsCount}})</span>
        
                        </div>
                        
                        {{else}}
                        
                            <div class="item-text">Мало отзывов</div>
                        
                        {{/js_if}}
                        
                    {{/js_if}}
                        
                </div>
    
            </a>
    
        </li>

    `
});