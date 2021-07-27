import React from 'react';
const HomePage=()=>{
    return (
        <>
            <div class="ui grey vertical masthead center aligned segment greybg">
                <div class="ui text container">
                    <h1 class="ui header">
                        Finstats
                    </h1>
                    <h2>Personal financial statistics, simplified</h2>
                    <div class="ui huge primary button">Get Started <i class="right arrow icon"></i></div>
                </div>
            </div>
            <div class="ui vertical stripe segment">
                <div class="ui middle aligned stackable grid container">
                    <div class="row">
                        <div class="eight wide column">
                        <h3 class="ui header">We Help Companies and Companions</h3>
                        <p>We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs...through pure data analytics.</p>
                        <h3 class="ui header">We Make Bananas That Can Dance</h3>
                        <p>Yes that's right, you thought it was the stuff of dreams, but even bananas can be bioengineered.</p>
                        </div>
                        <div class="six wide right floated column">
                        <img alt='white' src="assets/images/wireframe/white-image.png" class="ui large bordered rounded image"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="center aligned column">
                        <a href="/" class="ui huge button">Check Them Out</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HomePage;