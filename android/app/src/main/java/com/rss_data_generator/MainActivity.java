package com.rss_data_generator;

import android.os.Bundle; // here
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "rss_data_generator";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {

            @Override
            protected Bundle getLaunchOptions() {

                Intent intent = MainActivity.this.getIntent();
                Bundle bundle = new Bundle();
                Uri imageUri = intent.getParcelableExtra(Intent.EXTRA_STREAM);
                if (imageUri != null) {
                    bundle.putString("image", imageUri.toString());
                } else {
                    bundle.putString("image", "");
                }
                return bundle;
            }

        };
    }
}
