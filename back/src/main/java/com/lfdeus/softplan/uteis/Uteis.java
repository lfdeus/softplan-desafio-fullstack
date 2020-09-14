package com.lfdeus.softplan.uteis;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Uteis {

    public static String encryptMD5(String texto) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashMd5 = md.digest(texto.getBytes(StandardCharsets.UTF_8));
            return stringHex(hashMd5);
        } catch (NoSuchAlgorithmException ns) {
            ns.printStackTrace();
            return null;
        }
    }

    private static String stringHex(byte[] bytes) {
        StringBuilder s = new StringBuilder();
        for (byte b : bytes) {
            int high = ((b >> 4) & 0xf) << 4;
            int low = b & 0xf;
            if (high == 0) s.append('0');
            s.append(Integer.toHexString(high | low));
        }
        return s.toString();
    }

    public static boolean emptyString(String s) {
        if (s == null) {
            return true;
        }
        if (s.equals("")) {
            return true;
        }
        return false;
    }

    public static boolean emptyNumber(Number number) {
        return number == null || number.equals(0) || number.equals(0.0d);
    }
}
