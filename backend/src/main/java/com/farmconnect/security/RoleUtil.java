package com.farmconnect.security;

import jakarta.servlet.http.HttpServletRequest;

public class RoleUtil {

    public static boolean isAdmin(
            HttpServletRequest request) {

        String role =
            (String) request.getAttribute(
                "role"
            );

        return "Admin".equals(role);
    }

    public static boolean isFarmer(
            HttpServletRequest request) {

        String role =
            (String) request.getAttribute(
                "role"
            );

        return "Farmer".equals(role);
    }

    public static boolean isBuyer(
            HttpServletRequest request) {

        String role =
            (String) request.getAttribute(
                "role"
            );

        return "Buyer".equals(role);
    }
}
