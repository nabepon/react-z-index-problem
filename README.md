<!--
React導入事例のスライド
-->

# 今日のテーマ

---------

# 私はz-indexが嫌い

---------

# なぜ？

->[デモ解説](https://nabepon.github.io/react-z-index-problem/)

---------

## step 0

* スクロールするとModalボタンがheaderに被ってしまう

ヘッダーの z-inedx 1、ドロワーの z-index 2、モーダルは z-index 10。
ヘッダーはしばらくスクロールするとfixedになってmainの上に表示される。
モーダルをヘッダーの上に表示したいので z-index 10 になっているが、
コンテナにz-indexがついているのでボタンまで上に表示されてしまう。


## step 1

* ヘッダーをボタンより上に表示したくて、z-index 20 にする

「Next 0」ボタンを1回押して次に進める。
Modalボタンはヘッダーの下にくるようになったが、
Modalボタンを押すとモーダルがヘッダーに下に出てしまう。
ヘッダーが20、モーダルが10なので、そりゃそうだ。

## step 2

* .modal をヘッダーより上に表示したくて、z-index 30 にする

「Next 1」ボタンを1回押して次に進める。
すると、ヘッダーが20、モーダルが30にもかかわらず、
モーダルがヘッダーの下に表示されてしまう。
モーダルのコンテナ（.modalComponent）が10だからだ。

## step 3

* .modalComponentのz-indexをinitialにする

「Next 2」ボタンを1回押して次に進める。
すると、ヘッダーが20、モーダルが30の順番通りになって、無事モーダルが表示されて！
一見うまくいったようにみえる。
しかしドロワーを開いてみると、今度はドロワーがヘッダーの下に表示されてしまっている。
ヘッダーが20、ドロワーが2なので当然である。

## step 4

* ドロワーを40にしよう！

「Next 3」ボタンを1回押して次に進める。
すると、ドロワーが z-index 40 になり、無事ヘッダーの上に表示された！


# これで解決？

今回はわざとアホらしいz-indexのサンプルを作ったが、
業務中でもこういったz-index問題は意外と起る。
しかも、他人の書いたコードに影響を受けまくるし、
z-indexをいじると他人の書いたコードに影響も与えやすい。
しかもバグっていることに気づきにくいし、z-indexは調査もしずらい。
注意深く作ることで回避はできるが、健全な回避方法とは言い難い。

z-indexは、最後の手段にしよう・・・
できればちゃんとDOMtreeの順番通りに表示されるのが直感的だし、
バグも少なく扱いやすい。

---------

# めでたしめでたし

---------

# そんなわけねーだろ！

---------

# 今日のお話

---------

# 【React】z-indexで困る問題

---------

# 自己紹介

<img src="https://pbs.twimg.com/profile_images/811386468165767168/sJMkR8lt.jpg" height="100" width="100">

* 渡辺 貴明
* [<font color="#1da1f2"><i class="fa fa-twitter"></i></font> nabepon_dev](https://twitter.com/nabepon_dev) <font  color="LightGray"><i class="fa fa-comment-o"></i>follow me!</font>
* アジアクエスト株式会社
* フロントエンドエンジニア

---------

# 直近でやったプロジェクト

[某飲食サービスの姉妹サービス](https://speakerdeck.com/yoshidan/nodefest2016)
お察し...
react, redux, css modules, react-router etc...

---------

## 旧時代

モーダル、fixedヘッダー、ドロワーメニューなど、
手前に表示する要素の実装。

jQuery時代だと、DOM treeの最後の方に表示することで、
z-indexに頼らずとも実装することができた。

---------
手前に表示したいやつはbodyにappend

```
var $modal = $('<div class="modal">modal</div>')
$(body).append($modal);
```
表示順もDOMをゴリゴリ弄ればいいだけなので、
jsでなんとかすることができた。

---------

## 現代

Reactだとこういったことができない。
できるが、React上でDOMを探してappendするようなコードは書きたくない。
ではReactではどう実装するかというと、2パターンが考えられる。

---------

1つはz-indexで頑張る方法。

もう1つはDOMの後ろにあらかじめ配置しておく方法。

---------

DOMの後ろにあらかじめ配置

```jsx
<div id="root">
  <HeaderComponent />

  <main>
    <div>
      ...
      <FooComponent>
        <button onClick={openFoo}>open</button>
      </FooComponent>
      ...
      <BarComponent>
        <button onClick={openBar}>open</button>
      </BarComponent>
      ...
      ...
    </div>
  </main>

  <FooterComponent />
  
  <ForwardLayer>
    {isFooOpen ?
      <div class="fooModal"> foo </div>
    : null }

    {isBarOpen ?
      <div class="barModal"> bar </div>
    : null }
  </ForwardLayer>
</div>
```

---------

Reactだと事前にコンポーネントを配置し、
条件分岐でコンポーネントの表示非表示を行う。
面倒くさい。

---------

# Reactでも別の場所に表示したい！

---------

# ソリューション

---------

![](https://nabepon.github.io/react-z-index-problem/solution.png)

---------

# ライブラリを書いた

### [react-transfer](https://www.npmjs.com/package/react-transfer)
※ Google翻訳しただけのREADME。翻訳PR待ってます...

---------

# 使い方
Usageをみる。
Transporter内にある、TransportItemの要素を、Destinationに表示する。
[Example](https://github.com/nabepon/react-transfer/blob/master/example/src/components/Container.js)
[Demo](https://nabepon.github.io/react-transfer/example/src/)

---------

`<div>- component code start</div>` から
`<div>- component code end</div>`の
間にコードが書かれているが、実際に表示されるのは
`<div>- display component</div>` の下。

また、表示前のソート処理を行うなどできるので、
jsで表示順を制御できる。

[テストコード](https://github.com/nabepon/react-transfer/blob/master/test/index.js) があるので、そっち見た方がわかりやすいかも。

---------

# ~~【React】z-indexで困る問題~~

---------

# 解決！<font  color="LightGray">（？）</font>

---------

アジアクエストではメンバーを無限に募集してます！

お仕事も募集してます！
受託開発も業務委託も、
どちらもご相談くださいませ。

[<font color="#1da1f2"><i class="fa fa-twitter"></i></font> nabepon_dev](https://twitter.com/nabepon_dev)
