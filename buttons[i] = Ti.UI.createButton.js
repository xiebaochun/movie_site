buttons[i] = Ti.UI.createButton
                    ({ 
                        title: btn_title, 
                        backgroundColor: btn_color,
                        value : btn_color, 
                        height:'5.5%',
                        width:'8.6%', 
            id : i,
                        top: '57.5%', 
                        left: left_position +'%',
                        style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
                        font:{fontSize:16,fontWeight:'bold'},
                        backgroundGradient:{type:'linear',
                        colors:['#FFFFFF',btn_color],
                        startPoint:{x:0,y:0},
                        endPoint:{x:2,y:50},
                        backFillStart:false},
                        borderWidth:1,
                        borderColor:btn_color
                    });
 
                    self.add(buttons[i]);
 
              buttons[i].addEventListener('click', function(e)
                {
                    q_val = e.source.value;
                    buttons[e.source.id].borderColor = "black";
 
                });