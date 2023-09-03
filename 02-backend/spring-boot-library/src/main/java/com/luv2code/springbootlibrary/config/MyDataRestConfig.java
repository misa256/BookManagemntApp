package com.luv2code.springbootlibrary.config;

import com.luv2code.springbootlibrary.entity.Book;
import com.luv2code.springbootlibrary.entity.Review;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private String theAllowedOrigins = "http://localhost:3000/";

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        HttpMethod[] theUnsupportedActions = {HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH};
        //エンティティの公開設定(API叩かれて、JSON返す時に、idを含めて返すようにする)
        config.exposeIdsFor(Book.class);
        config.exposeIdsFor(Review.class);
        //エンティティの公開設定をカスタマイズする
        disableHttpMethods(Book.class, config, theUnsupportedActions);
        disableHttpMethods(Review.class, config, theUnsupportedActions);
        //指定されたパスパターンのCORSを有効にする
        //サーバー側のパス？
        cors.addMapping(config.getBasePath()+"/**")
                //クライアント側のパス？
                .allowedOrigins(theAllowedOrigins);


    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupportedActions) {
       //エンティティの公開設定を取得
        config.getExposureConfiguration()
                //特定のエンティティの公開設定を変更
                .forDomainType(theClass)
                //個別アイテム（エンティティの単一のリソース）に対して公開設定をカスタマイズする
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                //コレクション（エンティティのリストやセットなど）に対して公開設定をカスタマイズする
                .withCollectionExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)));
    }


}
